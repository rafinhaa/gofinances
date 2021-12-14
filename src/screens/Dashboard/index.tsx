import React, { useEffect } from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Dashboard: React.FC = () => {

	const [data, setData] = React.useState<DataListProps[]>([]);
	
	async function loadTransactions() {
		const dataKey = '@gofinances:transactions';
		const response = await AsyncStorage.getItem(dataKey);
		const transactions = response ? JSON.parse(response) : [];

		const transactionsFormatted: DataListProps[] = transactions
			.map((item: DataListProps) => {
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
		setData(transactionsFormatted);
	}
	useEffect(() => {
		loadTransactions();
	}, []);
	
	return (
		<Container>
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
					amount="3"
					lastTransaction="R$ 1.000,00"
					type="up"
				/>
				<HighlightCard
					title="Saídas"
					amount="3"
					lastTransaction="R$ 1.000,00"
					type="down"
				/>
				<HighlightCard
					title="Meus projetos"
					amount="3"
					lastTransaction="R$ 1.000,00"
					type="total"
				/>
			</HighlightCards>
			<Transactions>
				<Title>Listagem</Title>
				<TransactionsList
					data={data}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => <TransactionCard data={item} />}
				/>
			</Transactions>
		</Container>
	);
}

export default Dashboard;