import React from 'react';
import styled from 'styled-components';

const Footer = () =>(
    <StyledFooter>
        <p tabIndex={0}>Created by <a href="https://github.com/wiktort">Wiktor Tumiński</a></p>
    </StyledFooter>
);

export default Footer;

const StyledFooter = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.lightText};
    height: 150px;
    margin-top: 10px;
    a{
        color: ${(props) => props.theme.colors.lightText};
        text-decoration: underline;
    }
`;