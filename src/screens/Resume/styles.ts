import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { ScrollViewProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

interface MyScrollViewProps extends ScrollViewProps {
    paddingBottomNumber: number;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: ${RFValue(19)}px;
`;

export const Title  = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView.attrs<MyScrollViewProps>(props => ({
    contentContainerStyle: {
        showVerticalScrollIndicator: false,
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: props.paddingBottomNumber ? props.paddingBottomNumber : 0
    },
}))<MyScrollViewProps>``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const MonthSelect = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)`

`;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(34)}px;
`;

export const Month = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;
