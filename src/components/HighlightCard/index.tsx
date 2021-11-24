import React from 'react';

import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction,
} from './styles';

const HighlightCard: React.FC = () => {
  return (
        <Container>
            <Header>
                <Title>Entrada</Title>
                <Icon name="arrow-up-cicle" size={24} color="#FFB84D" />
            </Header>   
            <Footer>
                <Amount>R$ 100,00</Amount>
                <LastTransaction>Hoje às 10:00</LastTransaction>
            </Footer>
        </Container>
    );
}

export default HighlightCard;