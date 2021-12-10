import React from 'react';
import { RectButton } from 'react-native-gesture-handler';

interface Props extends RectButton {
    title: string;
}

import { 
    Container, 
    Title,
} from './styles';

const Button: React.FC<Props> = ({title,...rest}) => {
  return (
        <Container {...rest}>
            <Title>
                {title}
            </Title>
        </Container>
    );
}

export default Button;