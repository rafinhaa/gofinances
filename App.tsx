import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';

import theme  from './src/global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';
import SignIn from './src/screens/SignIn';

export default function App() {
  const [fontsLoaded] = useFonts({ // aguarda o carregamento das fontes
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) { // se não carregou, retorna um loading
    return <AppLoading />;
  }

  return (

    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content"/>
      <NavigationContainer>
        <SignIn/>
      </NavigationContainer>
    </ThemeProvider>
  );
}