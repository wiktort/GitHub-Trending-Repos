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
    const { _params, fetchRepos } = useReposStore();

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
    return(
        <div>
            <div>
                {createRadioButtons(filtersHandler("since"))}
            </div>
            <Select callback={filtersHandler("language")}/>
        </div>
    );
};

export default observer(FiltersBar);