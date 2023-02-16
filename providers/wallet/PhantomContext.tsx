import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Linking from "expo-linking";
import nacl from "tweetnacl";
import bs58 from "bs58";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { decryptPayload } from "../../utils/decryptPayload";
import { encryptPayload } from "../../utils/encryptPayload";
import { buildUrl } from "../../utils/buildUrl";

const onConnectRedirectLink = Linking.createURL("onConnect");
const onDisconnectRedirectLink = Linking.createURL("onDisconnect");
const onSignAndSendTransactionRedirectLink = Linking.createURL(
  "onSignAndSendTransaction"
);

export interface CommonWallet {
  phantomWalletPublicKey: PublicKey | null;
  session: string | undefined;
  balance: number | undefined;
  connect?: () => Promise<void>;
  disconnect: () => void;
  // signTransaction: (transaction: Transaction) => Promise<Transaction | Buffer>;
  // signMessage: (message: Uint8Array) => Promise<Uint8Array>;
}

export const PhantomContext = createContext<CommonWallet>({
  phantomWalletPublicKey: null,
  session: undefined,
  balance: undefined,
  connect: () => {
    throw new Error("Not initialized!");
  },
  disconnect: () => {},
  // signTransaction: (transaction: Transaction) => {
  //   throw new Error("Not initialized!");
  // },
  // signMessage: (message: Uint8Array) => {
  //   throw new Error("Not initialized!");
  // },
});

const connection = new Connection(clusterApiUrl("mainnet-beta"));

interface Props {
  children: React.ReactNode;
}

export const PhantomContextProvider: React.FC<Props> = (props) => {
  const [deeplink, setDeepLink] = useState<string>("");
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [balance, setBalance] = useState<number | undefined>();
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [session, setSession] = useState<string>();
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] =
    useState<PublicKey | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const initializeDeeplinks = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    };
    initializeDeeplinks();
    const listener = Linking.addEventListener("url", handleDeepLink);
    return () => {
      listener.remove();
    };
  }, []);

  const handleDeepLink = ({ url }: Linking.EventType) => setDeepLink(url);

  const getInfo = useCallback(async () => {
    if (phantomWalletPublicKey) {
      const SOL = connection.getAccountInfo(phantomWalletPublicKey);
      SOL.then((res) => res && setBalance(res?.lamports / LAMPORTS_PER_SOL));
    }
  }, []);

  useEffect(() => {
    setSubmitting(false);
    if (!deeplink) return;

    getInfo();

    const url = new URL(deeplink);
    const params = url.searchParams;

    if (params.get("errorCode")) {
      const error = Object.fromEntries([...params]);
      const message =
        error?.errorMessage ??
        JSON.stringify(Object.fromEntries([...params]), null, 2);
      console.log({
        type: "error",
        text1: "Error",
        text2: message,
      });
      console.log("error: ", message);
      return;
    }

    if (/onConnect/.test(url.pathname)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")!),
        dappKeyPair.secretKey
      );
      const connectData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecretDapp
      );
      console.log(`${connectData}`);
      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);
      setPhantomWalletPublicKey(new PublicKey(connectData.public_key));
      console.log(`connected to ${connectData.public_key.toString()}`);
    }

    if (/onDisconnect/.test(url.pathname)) {
      setPhantomWalletPublicKey(null);
    }

    if (/onSignAndSendTransaction/.test(url.pathname)) {
      const signAndSendTransactionData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );
    }
  }, [deeplink]);

  const connect = async () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: "mainnet-beta",
      app_url: "https://vercel.app/",
      redirect_link: onConnectRedirectLink,
    });
    const url = buildUrl("connect", params);
    Linking.openURL(url);
  };

  const disconnect = async () => {
    const payload = {
      session,
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onDisconnectRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });
    const url = buildUrl("disconnect", params);
    Linking.openURL(url);
  };

  const signAndSendTransaction = async (transaction: Transaction) => {
    if (!phantomWalletPublicKey) return;
    setSubmitting(true);
    transaction.feePayer = phantomWalletPublicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
    });
    const payload = {
      session,
      transaction: bs58.encode(serializedTransaction),
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignAndSendTransactionRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });
    const url = buildUrl("signAndSendTransaction", params);
    Linking.openURL(url);
  };

  const value = useMemo(
    () => ({
      connect,
      disconnect,
      phantomWalletPublicKey,
      session,
      balance,
    }),
    [connect, disconnect, phantomWalletPublicKey, session, balance]
  );
  return <PhantomContext.Provider value={value} {...props} />;
};

export const usePhantom = (): CommonWallet => {
  const context = useContext(PhantomContext);
  if (context === undefined) {
    throw new Error("Error in PhantomContext");
  }
  return context;
};
