import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
}

import { 
    Container, 
    Title,
} from './styles';

const Button: React.FC<Props> = ({title,onPress,...rest}: Props) => {
  return (
        <Container onPress={onPress} {...rest} >
            <Title>
                {title}
            </Title>
        </Container>
    );
}

export default Button;