import React from 'react';
import Button from '../../components/Form/Button/input';
import Input from '../../components/Form/Input';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles';

const Register: React.FC = () => {
    const [transactionType, setTransactionType] = React.useState('');

    function handleTransactionType(type: 'up' | 'down') {
        setTransactionType(type);
    }
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder="Nome"/>
                    <Input placeholder="Preço"/>
                    <TransactionTypes>
                        <TransactionTypeButton 
                            type="up" 
                            title="income" 
                            onPress={() => setTransactionType('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton
                            type="down" 
                            title="Outcome" 
                            onPress={() => setTransactionType('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionTypes>
                </Fields>
                <Button title="Enviar"/>
            </Form>
        </Container>
    );
}

export default Register;