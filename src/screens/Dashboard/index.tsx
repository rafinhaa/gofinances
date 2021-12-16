import React,
{ 
		useEffect, 
		useCallback,
		useState
	} 
from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export interface DataListProps extends TransactionCardProps {
	id: string;
}


import {
	Container,
	Header,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	UserWrapper,
	Icon,
	HighlightCards,
	Title,
	Transactions,
	TransactionsList,
	LogoutButton,
} from './styles';
import Load from '../../components/Load';

interface HighlightProps {
	amount: string;
}

interface HighlightData {
	entries: HighlightProps;
	expensives: HighlightProps;
	total: HighlightProps;
}

const Dashboard: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [transaction, setTransations] = useState<DataListProps[]>([]);
	const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
	
	async function loadTransactions() {
		const dataKey = '@gofinances:transactions';
		const response = await AsyncStorage.getItem(dataKey);
		const transactions = response ? JSON.parse(response) : [];

		let entriesTotal = 0;
		let expensiveTotal = 0;

		const transactionsFormatted: DataListProps[] = transactions
			.map((item: DataListProps) => {
				if (item.type === 'positive') {
					entriesTotal += Number(item.amount);
				}else {
					expensiveTotal += Number(item.amount);
				}
				const amount = Number(item.amount)
					.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					});
				const dateFormatted = Intl.DateTimeFormat('pt-BR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit',
				}).format(new Date(item.date));
				return {
					id: item.id,
					name: item.name,
					amount,
					type: item.type,
					category: item.category,
					date: dateFormatted,
				}
			}
		);
		setHighlightData({
			entries: {
				amount: entriesTotal.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})
			},
			expensives: {
				amount: expensiveTotal.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})
			},
			total: {
				amount: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})
			}
		});
		setTransations(transactionsFormatted);
		setIsLoading(false);
	}
	useEffect(() => {
		loadTransactions();
	}, []);

	useFocusEffect(
		useCallback(() => {
			loadTransactions();
		}, [])
	);
	
	return (
		<Container>
				{
				isLoading ? <Load /> :
				<>
					<Header>
						<UserWrapper>
							<UserInfo>
								<Photo source={{ uri: 'https://github.com/rafinhaa.png' }} />
								<User>
									<UserGreeting>Olá,</UserGreeting>
									<UserName>Rafinhaa</UserName>
								</User>
							</UserInfo>
							<LogoutButton onPress={ () => {} } >
								<Icon name="power"/>
							</LogoutButton>
						</UserWrapper>
					</Header>
					<HighlightCards
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<HighlightCard
							title="Entradas"
							amount={highlightData.entries.amount}
							lastTransaction="R$ 1.000,00"
							type="up"
						/>
						<HighlightCard
							title="Saídas"
							amount={highlightData.expensives.amount}
							lastTransaction="R$ 1.000,00"
							type="down"
						/>
						<HighlightCard
							title="Meus projetos"
							amount={highlightData.total.amount}
							lastTransaction={"R$ 1.000,00"}
							type="total"
						/>
					</HighlightCards>
					<Transactions>
						<Title>Listagem</Title>
						<TransactionsList
							data={transaction}
							keyExtractor={(item: DataListProps) => String(item.id)}
							renderItem={({ item }) => <TransactionCard data={item} />}
						/>
					</Transactions>
				</>
				}
		</Container>
	);
}

export default Dashboard;