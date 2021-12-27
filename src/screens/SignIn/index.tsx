import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import SignSocialButton from '../../components/SignSocialButton';
import { useAuth } from '../../hooks/auth';
import { Alert } from 'react-native';

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';

const SignIn: React.FC = () => {
    const {signInWithGoogle, signInWithApple} = useAuth();
    
    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Ocorreu um erro ao fazer login, tente novamente.');
        }
    }

    async function handleSignInWithApple() {
        try {
            await signInWithApple();
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Ocorreu um erro ao fazer login, tente novamente.');
        }
    }
    
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo {'\n'}
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignSocialButton 
                        title="Entrar com o Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    <SignSocialButton 
                        title="Entrar com o Apple"
                        svg={AppleSvg}
                        onPress={handleSignInWithApple}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}

export default SignIn;