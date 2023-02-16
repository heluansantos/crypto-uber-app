import { StatusBar } from "expo-status-bar";
import MapView from "react-native-maps";

// Providers
import { usePhantom } from "../../providers/wallet/PhantomContext";

// Components
import Item from "../../components/Item";
import Header from "../../components/Header";

// Styles
import {
  Container,
  List,
  ListTitleLeft,
  ListTitleRight,
  ViewList,
  ViewListTitle,
} from "./styles";

//Utils
import { RootTabScreenProps } from "../../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const { disconnect, balance } = usePhantom();

  return (
    <Container>
      <StatusBar style="light" />
      <Header />

      <MapView
        style={{ flex: 1, width: "100%" }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <ViewList>
        <ViewListTitle>
          <ListTitleLeft>Driver type</ListTitleLeft>
          <ListTitleRight>Price</ListTitleRight>
        </ViewListTitle>
        <List>
          {typeList.map((item, index) => {
            return <Item key={index} itemType={item} />;
          })}
        </List>
      </ViewList>
    </Container>
  );
}

const typeList = [
  {
    id: 0,
    icon: "wallet.icon",
    nick: "SOL",
    title: "Simple",
    balance: 530.9,
    price: 23000,
    positiveBalance: 10.23,
    negativeBalance: null,
  },
  {
    id: 1,
    icon: "wallet.icon",
    nick: "SOL",
    title: "Classic",
    balance: 30,
    price: 1200,
    positiveBalance: null,
    negativeBalance: 10,
  },
  {
    id: 2,
    icon: "wallet.icon",
    nick: "SOL",
    title: "Premiun",
    balance: 1240,
    price: 2.5,
    positiveBalance: null,
    negativeBalance: 50,
  },
  {
    id: 3,
    icon: "wallet.icon",
    nick: "SOL",
    title: "Hibrid",
    balance: 530.9,
    price: 23000,
    positiveBalance: 10.23,
    negativeBalance: null,
  },
];
