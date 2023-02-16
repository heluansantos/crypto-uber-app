import styled from "styled-components/native";

interface BalanceProps {
  status?: string;
}

export const Container = styled.View`
  background: #292929;
  border-radius: 10px;
  width: 100%;
  margin-vertical: 5px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Balance = styled.Text<BalanceProps>`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  background: #292929;
  color: ${(props) =>
    props.status === "positive"
      ? "#58CC4E"
      : props.status === "negative"
      ? "#FF5656"
      : "#858585"};
`;

export const SubTitle = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  background: #292929;
  color: #f2f2f2;
`;

export const Image = styled.Image`
  height: 30px;
  width: 30px;
`;

export const ViewImage = styled.View`
  background: #3d3d3d;
  border-radius: 10px;
  padding: 12px
  margin-right: 10px;
`;
