import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import Register from './src/screens/Register';
import theme  from './src/global/styles/theme';
import CategorySelect from './src/screens/CategorySelect';

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
      <CategorySelect />
    </ThemeProvider>
  );
}