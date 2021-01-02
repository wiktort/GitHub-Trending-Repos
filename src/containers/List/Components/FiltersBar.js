import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

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
    const {params, fetchRepos, sortSettings, setParams, setSortSettings, sortRepos } = useReposStore();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(false)
    },[])

    useEffect(() => {
        sortRepos();
    }, [sortRepos, loading])

    const filtersHandler = param => {
        const _param = param; 
        return (e) => {
            const { value } = e.target;
            setParams(_param, value)
            fetchRepos();
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
        <div>
            <div>
                {showRadioButtons}
            </div>
            <div>
                <Select 
                    callback={filtersHandler(lex.language)} 
                />
            </div>
            <div>
                <label key={keyGenerator()} htmlFor="sort" />
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
            </div>
        </div>
    );
};

export default observer(FiltersBar);