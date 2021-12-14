import React, { useState } from 'react';
import {
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver }  from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputForm from '../../components/Form/InputForm';
import Button from '../../components/Form/Button';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import CategorySelect from '../CategorySelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles';

interface FormDate {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup
        .number()
        .required('Preço é obrigatório')
        .positive('Preço deve ser positivo')
        .typeError('Preço deve ser numérico'),
});

const Register: React.FC = () => {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const dataKey = '@gofinances:transactions';

    function handleTransactionType(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    async function handleRegister(form: FormDate) {
        if (!transactionType) {
            return Alert.alert('Erro', 'Selecione um tipo de transação');
        }
        if (category.key === 'category') { 
            return Alert.alert('Erro', 'Selecione uma categoria');
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
            date: new Date()
        }
        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormatted = [
                ...currentData,
                newTransaction,
            ];
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            });
            navigation.navigate('Listagem');
        } catch (error) {
            console.log(error); 
            Alert.alert('Erro', 'Erro ao registrar transação');
        }
    }

    // useEffect(() => {
    //     async function loadData() {
    //         const data = await AsyncStorage.getItem(dataKey);
    //         console.log(JSON.parse(data)!);
    //     }
    //     loadData();
    //     async function removeAll() {
    //         await AsyncStorage.removeItem(dataKey);
    //     }
    //     removeAll();
    // },[])

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes>
                            <TransactionTypeButton
                                type="up"
                                title="income"
                                onPress={() => handleTransactionType('up')}
                                isActive={transactionType === 'up'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Outcome"
                                onPress={() => handleTransactionType('down')}
                                isActive={transactionType === 'down'}
                            />
                        </TransactionTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}

export default Register;