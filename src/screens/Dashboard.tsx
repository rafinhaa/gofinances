import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

// import { Container } from './styles';

const Dashboard: React.FC = () => {
	return (
		<View 
			style={styles.container}
		>
			<Text>Dashboard</Text>
		</View>
	);
}

export default Dashboard;

const styles = StyleSheet.create({
	container: {
		flex: 1, // ocupa todo o espaço disponível
		justifyContent: 'center', // alinha o conteúdo na vertical
		alignItems: 'center', // alinha o conteúdo na horizontal
	},
});