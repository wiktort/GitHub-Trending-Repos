import { observer } from "mobx-react-lite";

import { useReposStore } from "../stores/hooks";

import { keyGenerator } from "../../../Shared/helpers";

const radioName = "since";
const since = [
    ["daily", true],
    ["weekly"],
    ["monthly"]
];

const createRadioButtons = (handler) => 
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
    const radioHandler = e => {
        _params.since = e.target.value;
        fetchRepos();
    };
    return(
        <div>
            {createRadioButtons(radioHandler)}
        </div>
    )
};

export default observer(FiltersBar);