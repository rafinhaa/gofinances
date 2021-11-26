import React from 'react';
import HighlightCard from '../../components/HighlightCard';

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
} from './styles';

const Dashboard: React.FC = () => {
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
		</Container>
	);
}

export default Dashboard;