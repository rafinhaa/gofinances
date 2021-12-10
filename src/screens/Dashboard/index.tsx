import React from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';
import { TransactionCardProps } from '../../components/TransactionCard';

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

	const data: DataListProps[] = [
		{
			id: '1',
			type: 'positive',
			title:"Entradas",
			amount:"3",
			category:{
				name: 'Alimentação',
				icon: 'dollar-sign',
			},
			date:"20/10/2020"
		},
		{
			id: '2',
			type: 'negative',
			title:"Saídas",
			amount:"3",
			category:{
				name: 'Alimentação',
				icon: 'coffee',
			},
			date:"20/10/2020"
		},
	];

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
				<Title>Olá</Title>
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