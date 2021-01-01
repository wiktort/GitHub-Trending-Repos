import { useEffect } from 'react';
import { observer } from "mobx-react-lite";

import { useReposStore } from "./stores/hooks";
import ListItem from './Components/ListItem';
import FiltersBar from './Components/FiltersBar';

import { keyGenerator } from '../../Shared/helpers';

const createItems = list => 
    list.map(item => <ListItem data={item} key={keyGenerator()} />); 

const List = () => {
    const { repos, fetchRepos } = useReposStore();

    useEffect(() => {
        fetchRepos()
    },[fetchRepos])   

    const showRepos = repos.displayed.length > 0 ? createItems(repos.displayed) : null;

    return (
        <div>
            <FiltersBar />
            {showRepos}
        </div>
    )
};

export default observer(List);