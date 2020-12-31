import { useState, useEffect } from 'react';

import { keyGenerator, createURL } from "../../../Shared/helpers";
import { getData } from '../../../Shared/api/getData';

const createOptions = (options) => {
    return options.reduce((acc, current) => {
         const { urlParam, name } = current;
         return acc.concat(<option key={keyGenerator()} value={urlParam}>{name}</option>);
     },[]);
};

const getLanguages = fn => {
    const url = createURL({languages: true})
    getData(url)
        .then(data => fn(data));
};

const Select = props => {
    const [langs, setLangs] = useState([]);
    
    useEffect(() => {
        getLanguages(setLangs)
    }, [])

    const { callback } = props;
    const id = "selectLanguage";

    return(
        <div>
            <label key={keyGenerator()} htmlFor={id} />
                <select 
                key={keyGenerator()}
                onChange={(e) => callback(e)}
                name={id} 
                id={id}>
                    <option key={keyGenerator()} value="">Choose a language:</option>
                    {createOptions(langs)}
                </select>
        </div>
    );
};

export default Select;
