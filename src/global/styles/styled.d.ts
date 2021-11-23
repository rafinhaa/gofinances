import "styled-components";
import theme from "./theme";

declare module "styled-components" { // Acessando o modulo styled-components
    type ThemeType = typeof theme; // sobreescrevendo o tipo do tema, para que o styled-components consiga acessar o tema
    export interface DefaultTheme extends ThemeType {} // pegando a interface do styled-components e extendendo (acrescentando) ela com o tipo do tema (nosso tema)
}