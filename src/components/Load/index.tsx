import React from 'react';
import { useTheme } from 'styled-components';

import { LoadContainer, LoadIndicator } from './styles';

const Load: React.FC = () => {
    const theme = useTheme();
    return (
        <LoadContainer>
            <LoadIndicator size="large" />
        </LoadContainer>
    );
}

export default Load;