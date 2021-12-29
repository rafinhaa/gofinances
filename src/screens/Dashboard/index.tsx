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
import { useAuth } from '../../hooks/auth';

interface HighlightProps {
	amount: string;
	lastTransaction: string;
}

interface HighlightData {
	entries: HighlightProps;
	expensives: HighlightProps;
	total: HighlightProps;
}

const Dashboard: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [transaction, setTransactions] = useState<DataListProps[]>([]);
	const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
	const { signOut, user } = useAuth();

	function getLastTransactionDate(collection: DataListProps[], type: 'positive'| 'negative'){
		const lastTransactions = new Date (
			Math.max.apply(Math, collection
				.filter(t => t.type === type)
				.map(t => new Date(t.date).getTime())
			)
		)
		return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR',{month: 'long'})}`
	}
	
	async function loadTransactions() {
		const dataKey = `@gofinances:transactions_user:${user.id}`;
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
		setTransactions(transactionsFormatted);
		const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
		const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
		const totalInterval = `01 a ${lastTransactionExpensives}`;
		
		setHighlightData({
			entries: {
				amount: entriesTotal.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}),
				lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
			},
			expensives: {
				amount: expensiveTotal.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}),
				lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
			},
			total: {
				amount: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}),
				lastTransaction: totalInterval,
			}
		});
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
								<Photo source={{ uri: user.photo }} />
								<User>
									<UserGreeting>Olá,</UserGreeting>
									<UserName>{user.name}</UserName>
								</User>
							</UserInfo>
							<LogoutButton onPress={ signOut } >
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
							lastTransaction={highlightData.entries.lastTransaction}
							type="up"
						/>
						<HighlightCard
							title="Saídas"
							amount={highlightData.expensives.amount}
							lastTransaction={highlightData.expensives.lastTransaction}
							type="down"
						/>
						<HighlightCard
							title="Meus projetos"
							amount={highlightData.total.amount}
							lastTransaction={highlightData.total.lastTransaction}
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