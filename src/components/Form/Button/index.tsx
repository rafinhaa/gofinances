import React from 'react';
import { TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
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