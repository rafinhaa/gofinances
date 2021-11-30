import styled from "styled-components/native";
import { TextInput } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.shape};
    padding: 18px;
    font-size: ${RFValue(14)}px;
    border-radius: 5px;
    margin-bottom: 8px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.title};
`;