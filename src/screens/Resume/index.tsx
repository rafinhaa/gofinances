import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HistoryCard from '../../components/HistoryCard';

import { 
  Container, 
  Header, 
  Title,
  Content,
} from './styles';
import { categories } from '../../utils/categories';


interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

const Resume: React.FC = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];
    
    const expensives = responseFormatted
      .filter((transaction: TransactionData) => transaction.type === 'negative');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
            categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          color: category.color,
        });
      }

    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);


  return (
      <Container>
        <Header>
          <Title>Resumo por categoria</Title>
        </Header>
        <Content>
          {
            totalByCategories.map((category: CategoryData) => (
              <HistoryCard
                key={category.key}
                title={category.name}
                amount={category.total}
                color={category.color}
              />
            ))
          }
        </Content>
      </Container>
    );
}

export default Resume;