import { usePhantom } from "../../providers/wallet/PhantomContext";
import React from "react";
import { Button, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Connect() {
  const { connect } = usePhantom();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <View style={{ marginTop: 15 }}>
            <Button title="Connect Phantom" onPress={connect} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
