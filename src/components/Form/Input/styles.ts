import styled, { css } from "styled-components/native";
import { TextInput } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface IProps {
  active: boolean;
}

export const Container = styled(TextInput)<IProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 18px;
  font-size: ${RFValue(14)}px;
  border-radius: 5px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  ${({ active, theme: { colors } }) =>
    active &&
    css`
      border-width: 3px;
      border-color: ${colors.attention};
    `}
`;
