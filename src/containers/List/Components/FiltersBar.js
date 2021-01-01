// import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useReposStore } from '../stores/hooks';

import { keyGenerator } from '../../../Shared/helpers';
import Select from './Select';

const radioName = "since";
const since = [
    ["daily", true],
    ["weekly"],
    ["monthly"]
];

const createRadioButtons = handler => 
    since.map(item => (
        <div key={keyGenerator()}>
            <input 
                onChange={(e)=> handler(e)}
                type="radio" 
                name={radioName}
                id={item[0]}
                value={item[0]}
                defaultChecked={item[1]}
            />
            <label htmlFor={item[0]}>
                {item[0].toUpperCase()}
            </label>
        </div>
    ));



const FiltersBar = () => {
    const { _params, fetchRepos, sortRepos } = useReposStore();

    // const [langs, setLangs] = useState([]);
    
    // useEffect(() => {
    //     getLanguages(setLangs)
    // }, [])
    
    const filtersHandler = param => {
        const par = param; 
        return (e) => {
            _params[par] = e.target.value;
            fetchRepos();
        };
    };
    const sortHandler = e => {
        
        const value = Number(e.target.value);
        const sort = value === -1 ? false : true;
        sortRepos(sort, value);
    };
    return(
        <div>
            <div>
                {createRadioButtons(filtersHandler("since"))}
            </div>
            <div>
                <Select callback={filtersHandler("language")}/>
            </div>
            <div>
                <label key={keyGenerator()} htmlFor="sort" />
                    <select 
                    key={keyGenerator()}
                    onChange={(e) => sortHandler(e)}
                    name="sort" 
                    id="sort"
                    >
                        <option key={keyGenerator()} value="-1">No sorting</option>
                        <option key={keyGenerator()} value="0">Most stars first</option>
                        <option key={keyGenerator()} value="1">Least stars first</option>
                    </select>
            </div>
        </div>
    );
};

export default observer(FiltersBar);