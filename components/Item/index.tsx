import { View } from "../Themed";
import {
  Balance,
  Container,
  Image,
  SubTitle,
  ViewImage,
  ViewRow,
} from "./styles";
// import { usePhantom } from "../../providers/wallet/PhantomContext";

interface itemTypeProps {
  itemType: {
    id: number;
    icon: string;
    nick: string;
    title: string;
    balance: number;
    price: number;
    positiveBalance: number | null;
    negativeBalance: number | null;
  };
}

const Item: React.FC<itemTypeProps> = ({ itemType }) => {
  // const { wallet } = usePhantom();

  return (
    <Container>
      <ViewRow>
        <ViewImage>
          <Image source={{ uri: itemType?.icon }} />
        </ViewImage>
        <View>
          <SubTitle>{itemType?.title}</SubTitle>
          <Balance>
            {itemType?.price} - {itemType?.nick}
          </Balance>
        </View>
      </ViewRow>
      <ViewRow>
        <View>
          <SubTitle>$ {itemType?.balance}</SubTitle>
          <Balance status={itemType?.positiveBalance ? "positive" : "negative"}>
            {itemType?.negativeBalance
              ? `-${itemType?.negativeBalance}`
              : `+${itemType?.positiveBalance}`}
          </Balance>
        </View>
      </ViewRow>
    </Container>
  );
};

export default Item;
