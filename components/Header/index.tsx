import { View } from "../Themed";
import { Container, Image, Name, SubTitle, Title, ViewRow } from "./styles";
import IconLogo from "../../assets/icons/IconLogo.svg";
import { useState } from "react";
import { usePhantom } from "../../providers/wallet/PhantomContext";

const Header = () => {
  return (
    <Container>
      <ViewRow>
        {/* <IconLogo /> */}
        <Title>Cripto Uber</Title>
      </ViewRow>
      <ViewRow>
        <Image
          source={{
            uri: "https://pbs.twimg.com/profile_images/1391732020/phantom_400x400.png",
          }}
        />
        <View>
          <SubTitle>Hello</SubTitle>
          <Name>User</Name>
        </View>
      </ViewRow>
    </Container>
  );
};

export default Header;
