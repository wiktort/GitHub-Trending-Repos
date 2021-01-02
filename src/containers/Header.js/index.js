import React from 'react';
import styled from 'styled-components';


const Header = () => (
    <StyledHeader>
        <div>
            <p>GitHub Trending Repositories</p>
        </div>
    </StyledHeader>
    );

export default Header;


const StyledHeader = styled.header`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.lightText};
    line-height: ${(props) => props.theme.sizes.headerHeight};
    padding-left: 2vmax;
    z-index: 1;
`;