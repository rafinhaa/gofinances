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
				<HighlightCard/>
				<HighlightCard/>
				<HighlightCard/>
			</HighlightCards>
		</Container>
	);
}

export default Dashboard;