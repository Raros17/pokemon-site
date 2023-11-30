import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    color: {
      text: string;
      subText:string;
      background: string;
      backgroundSub: string;
      cardBackground: string;
      sideBackground: string;
    };
  }
}