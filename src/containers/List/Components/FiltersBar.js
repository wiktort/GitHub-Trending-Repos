import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { useReposStore } from '../stores/hooks';

import { keyGenerator } from '../../../Shared/helpers';
import Select from './Select';

const lex = {
    since: "since",
    language: "language"
} ;

const radioName = "since";
const since = [
    ["daily", true],
    ["weekly"],
    ["monthly"]
];

const createRadioButtons = (handler, checked) => 
    since.map(item => {
            const defaultChecked = checked ? checked === item[0] : item[1];
        return (
            <div key={keyGenerator()}>
                <input 
                    onChange={(e)=> handler(e)}
                    type="radio" 
                    name={radioName}
                    id={item[0]}
                    value={item[0]}
                    defaultChecked={defaultChecked}
                />
                <label htmlFor={item[0]}>
                    {item[0].toUpperCase()}
                </label>
            </div>
        )
    });
    
const FiltersBar = () => {
    const {params, sortSettings, setParams, setSortSettings, sortRepos } = useReposStore();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(false)
    },[]); 

    const filtersHandler = param => {
        const _param = param; 
        return (e) => {
            const { value } = e.target;
            setParams(_param, value)
        };
    };

    const sortHandler = e => {
        const value =  Number(e.target.value);
        const sorting = value === -1 ? false : true;

        setSortSettings(sorting, value);
        sortRepos();
    };

    const showRadioButtons = loading ? null : createRadioButtons(filtersHandler(lex.since), params.since);
    
    return(
        <StyledWrapper>
            <StyledRadioDiv>
                {showRadioButtons}
            </StyledRadioDiv>
            <StyledDiv>
                <Select 
                    callback={filtersHandler(lex.language)} 
                />
            </StyledDiv>
            <StyledDiv>
                <label key={keyGenerator()} htmlFor="sort">Sorting</label>
                    <select 
                    key={keyGenerator()}
                    onChange={(e) => sortHandler(e)}
                    defaultValue={sortSettings.minmax}
                    name="sort" 
                    id="sort"
                    >
                        <option key={keyGenerator()} value="-1">No sorting</option>
                        <option key={keyGenerator()} value="0">Most stars first</option>
                        <option key={keyGenerator()} value="1">Least stars first</option>
                    </select>
            </StyledDiv>
        </StyledWrapper>
    );
};

export default observer(FiltersBar);

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
    width: 100%;
    margin: 1vh 0 2vh;
    padding-bottom: 2vh;
    border-bottom: 1px solid ${(props) => props.theme.colors.button};
    @media (min-width: 533px){
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 2fr;
    }
    @media (min-width: 823px){
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
    }
`;

const StyledRadioDiv = styled.div`
    display: flex;
    justify-content: center;
    max-width: 100%;
    line-height: 21px;
    input, label{
        line-height: 21px
    }
    @media (min-width: 533px){
        justify-content: inherit;
    }
`;

const StyledDiv = styled.div`
    width: 200px;
    margin-right: auto;
    margin-left: auto;
    select{
        width: 100%;
    }
    @media (min-width: 533px){
        grid-row: 2;
    }
    @media (min-width: 823px){
        grid-row: auto;
    }
`;