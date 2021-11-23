import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import Dashboard from './src/screens/Dashboard';
import theme  from './src/global/styles/theme';

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
      <Dashboard />
    </ThemeProvider>
  );
}