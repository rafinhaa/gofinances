import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import theme from "../../global/styles/theme";

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    align-items: center;
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: ${RFValue(19)}px;

`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;
    flex-direction: row;
    text-align: center;
    background-color: ${({ isActive }) => 
        isActive ? theme.colors.secondaryLight : theme.colors.background
    };
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: ${RFValue(16)}px;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.TouchableOpacity`
    width: 100%;
    padding: 24px;
`;