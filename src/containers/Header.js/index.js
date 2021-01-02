import React from 'react';
import styled from 'styled-components';


const Header = () => (
    <StyledHeader>
        <div>
            <h1 tabIndex={0}>GitHub Trending Repositories</h1>
        </div>
    </StyledHeader>
    );

export default Header;


const StyledHeader = styled.header`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.lightText};
    line-height: ${(props) => props.theme.sizes.headerHeight};
    padding-left: 20px;
    h1{
        font-weight: bold;
    }
`;