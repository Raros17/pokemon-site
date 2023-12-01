import {DefaultTheme} from 'styled-components/native';

const light: DefaultTheme = {
    color: {
        text: '#222',
        subText: '#2d4596',
        background:'#4185c2',
        backgroundSub: '#f2f2f4',
        cardBackground: '#f2f2f4',
        sideBackground: '#fec20c',
        cardBtn: '#ff7777'
    }
}
const dark: DefaultTheme = {
    color: {
        text: '#eaeaea',
        subText: '#1a1a79',
        background:'#1a1a29',
        backgroundSub: '#1a1a79',
        cardBackground: '#1a1a79',
        sideBackground: '#E8AA42',
        cardBtn: '#1a1a29'
    }
}

export {dark, light};