import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const LoadIndicator = styled(ActivityIndicator).attrs(props => ({
    color: props.theme.colors.primary
}))`
`;