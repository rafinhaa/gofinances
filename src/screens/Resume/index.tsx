import React from 'react';
import HistoryCard from '../../components/HistoryCard';

import { 
  Container, 
  Header, 
  Title,
} from './styles';

const Resume: React.FC = () => {
  return (
      <Container>
        <Header>
          <Title>Resumo por categoria</Title>
        </Header>
        <HistoryCard 
          title="Alimentação"
          amount="R$ 100,00"
          color="#FF872C"
        />
      </Container>
    );
}

export default Resume;