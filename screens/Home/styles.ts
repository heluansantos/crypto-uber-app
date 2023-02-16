import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #222222;
`;

export const ViewList = styled.View`
  background-color: #222222;
  align-items: center;
  margin-top: 10px;
  height: 30%;
`;

export const ViewListTitle = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ListTitleLeft = styled.Text`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

export const ListTitleRight = styled.Text`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: #9d9d9d;
`;

export const List = styled.ScrollView.attrs({
  horizontal: false,
})`
  width: 90%;
  height: 100%;
`;
