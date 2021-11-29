import React from 'react';

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';

const TransactionCard: React.FC = () => {
  return (
    <Container>
        <Title>Desenvolvimento de Site</Title>
        <Amount>R$ 12.000</Amount>
        <Footer>
            <Category>
                <Icon name="dollar-sign"/>
                <CategoryName>Vendass</CategoryName>
            </Category>

            <Date>01/01/2001</Date>
        </Footer>
    </Container>
  );
}

export default TransactionCard;