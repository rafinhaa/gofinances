import React from 'react';
import {ActivityIndicatorProps} from 'react-native';


import { LoadContainer, LoadIndicator } from './styles';

const Load: React.FC<ActivityIndicatorProps> = ({
    ...rest
}) => {
    return (
        <LoadContainer>
            <LoadIndicator {...rest} />
        </LoadContainer>
    );
}

export default Load;