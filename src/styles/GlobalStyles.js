import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyles = createGlobalStyle`
    :root{
        /* ============COLOR============ */
        /* Green Palette */
        --color-dark-green: #00573F;
        --color-light-green: #90B54C;
        --color-green: #233734;
        --color-spotlight-green: #D9EFE9;
        --color-active-green: #007C5C;
        
        /* Black&Gray Palette */
        --color-black: #000000; 
        --color-dark-gray: #424242;
        --color-gray: #9D9D9D;
        
        /* Argent&Silver Palette */
        --color-argent: #BFBFBF;
        --color-old-silver: #848484;
        --color-sonic-silver: #747475;
    
        /* White Palette */
        --color-white-gray: #FEFEFE;
        --color-light-gray: #E8E8E8;
        --color-light-white: #F5F5F5;
        --color-white: #FFFFFF;
        --color-chinese-white: #D9E7DD;
        --color-cultured-white: #F4F4F4;

        /* Others */
        --color-yellow: #FFF5D0;
        --color-red: #EA4335;
        --color-background: #BCC2B0;
        --color-dark-charcoal: #303031;

        /* ============FONT SIZE============ */
        --font-extra-large: 60px;
        --font-large: 32px;
        --font-medium: 20px;
        --font-regular: 16px;
        --font-small: 14px;
        --font-micro: 12px;

        /* ============FONT WEIGHT============ */
        --weight-bold: 700;
        --weight-semi-bold: 600; 
        --weight-regular: 400;
        --weight-light: 300;

        /* ============SIZE============ */
        --size-extra-large: 200px;
        --size-large: 150px;
        --size-medium: 120px;
        --size-small: 80px;
        --size-border-radius: 10px;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }

    body{
        background-color: var(--color-white);
        color: var(--color-black);
    }

    button{
        background-color: transparent;
        cursor: pointer;
        border: none;
        outline: none;
    }

    input {
        border: none;
        background-image: none;
        background-color: transparent;
        box-shadow: none;
        outline: none;
    } 

    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }

    textarea {
    border: none;
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    resize: none;
}  
`;

export const StLink = styled(Link)`
  text-decoration: none;
  color: var(--color-black);
  cursor: pointer;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;
