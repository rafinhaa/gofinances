import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';

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
} from './styles';

const Dashboard: React.FC = () => {
	const data = [
		{
			title:"Entradas",
			amount:"3",
			category:{
				name: 'Alimentação',
				icon: 'dollar-sign',
			},
			date:"20/10/2020"
		},
		{
			title:"Saídas",
			amount:"3",
			category:{
				name: 'Alimentação',
				icon: 'dollar-sign',
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
					<Icon name="power"/>
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
					renderItem={({ item }) => <TransactionCard data={item} />}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: getBottomSpace() }}
				/>
			</Transactions>
		</Container>
	);
}

export default Dashboard;