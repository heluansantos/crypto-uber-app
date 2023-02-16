import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #222222;
  border-bottom-width: 1px;
  border-bottom-color: #2d2d2d;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 14px;
  line-height: 19px;
  margin-left: 10px;
  color: #d19df5;
`;

export const Name = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: #d3d3d3;
`;

export const SubTitle = styled.Text`
  font-size: 8px;
  line-height: 11px;
  color: #838383;
`;

export const Image = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin-right: 10px;
`;
