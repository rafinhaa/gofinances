import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import HistoryCard from '../../components/HistoryCard';

import { 
  Container, 
  Header, 
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';
import { categories } from '../../utils/categories';
import theme from '../../global/styles/theme';
import Load from '../../components/Load';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';


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
  totalFormatted: string;
  total: number;
  color: string;
  percent: string
}

const Resume: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const theme = useTheme();
  const { user } = useAuth();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    }else{
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];
    
    const expensives = responseFormatted
      .filter((transaction: TransactionData) => 
        transaction.type === 'negative' && 
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
      );

    const expensivesTotal = expensives.reduce((accumulator: number, transaction: TransactionData) => {
      return accumulator + Number(transaction.amount);
    }, 0);

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

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          totalFormatted: total,
          total: categorySum,
          color: category.color,
          percent,
        });
      }

    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
      loadData();
  }, [selectedDate]));

  return (
      <Container>
        <Header>
          <Title>Resumo por categoria</Title>
        </Header>
        <Content
          paddingBottomNumber={useBottomTabBarHeight()}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')} >
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>
            <Month>{
              format(selectedDate, 'MMMM, yyyy', { locale: ptBR })
            }</Month>
            <MonthSelectButton onPress={() => handleDateChange('next')} >
            <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>
          {
            isLoading ? <Load /> : 
              <>
                <ChartContainer>
                  <VictoryPie
                    data={totalByCategories}
                    x="percent"
                    y="total"
                    colorScale={totalByCategories.map(category => category.color)}
                    style={{
                      labels: {
                        fontSize: RFValue(18),
                        fontWeight: 'bold',
                        fill: theme.colors.shape
                      }
                    }}
                    labelRadius={50}
                  />
                </ChartContainer>
                {
                  totalByCategories.map((category: CategoryData) => (
                    <HistoryCard
                      key={category.key}
                      title={category.name}
                      amount={category.totalFormatted}
                      color={category.color}
                    />
                  ))
                }
              </>
          }
        </Content>
      </Container>
    );
}

export default Resume;