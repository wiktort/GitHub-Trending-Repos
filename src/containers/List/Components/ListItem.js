import styled from "styled-components";

const ListItem = ({data}) => {
    const { author, name, language, stars, url } = data;
    return(
        <StyledLi>
            <p tabIndex={0}><span className="pre">Name:</span><span className="name"> {name}</span></p>
            {language 
            ? <p tabIndex={0}><span className="pre">Language:</span><span className="lang"> {language}</span></p> 
            : null}
            <p tabIndex={0}><span className="pre">Author:</span> {author} </p>
            <p tabIndex={0}><span className="pre">Stars:</span> {stars}</p>
            <p tabIndex={0}><span className="pre">URL:</span> <a href={url}>link</a></p>
        </StyledLi>
    )

};

export default ListItem;

const StyledLi = styled.li`
    width: 280px;
    margin: 0 5px 10px;
    padding: 1vmax;
    border: 1px solid ${props => props.theme.colors.button};
    .lang{
        color: ${props => props.theme.colors.button};
    }
    .name{
        font-weight: bold;
    }
    .desc{
        margin: 2px auto;
        font-style: italic;
    }
    .pre{
        text-decoration: underline;
        margin-right: 10px;
        line-height: 150%;
    }
    a{
        color: ${props => props.theme.colors.text};
        font-weight: bold;
        text-decoration: underline;
    }
`;