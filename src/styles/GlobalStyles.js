import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyles = createGlobalStyle`
    :root{
        /* Color */
        --color-black: #1a1a1d; /* 191919 */
        --color-white: #F7F7FF;
        --color-light-white: #f7f9fb;
        --color-gray: #fafafa;
        --color-light-gray: #e2ebf2;
        --color-green: #687862;
        --color-dark-blue: #31708e;
        --color-blue: #5085a5;
        --color-primary: #8fc1e3;
        --color-red: #dc143d;

        /* Font size */
        --font-extra-large: 60px;
        --font-large: 32px;
        --font-medium: 20px;
        --font-regular: 16px;
        --font-small: 14px;
        --font-micro: 12px;

        /* Font weight */
        --weight-bold: 700;
        --weight-semi-bold: 600; 
        --weight-regular: 400;
        --weight-light: 300;

        /* Size */
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
    }

    body{
        font-family: 'Inter', sans-serif;
        background-color: var(--color-light-white);
        color: var(--color-black);
    }

    button{
        background-color: transparent;
        cursor: pointer;
        border: none;
        outline: none;
        padding: 0px;
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
