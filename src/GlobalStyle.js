import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
    --maxWidth:100%;
    --fontSuperBig: 2.5rem;
    --fontBig:1.5rem;
    --fontMed: 1.2rem;
    --fontSmall:1rem;
    
    --white: #fff;
    --lightGrey: rgb(189, 187, 196);
    --medGrey: #353535;
    --darkGrey: #1c1c1c;
    --primary:rgb(34, 20, 95);
    --bgColor:rgb(254, 254, 255);

}

*{
    box-sizing: border-box;
    font-family: 'Abel', sans-serif;
}

body{
}
`
