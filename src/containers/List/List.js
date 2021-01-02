import { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { autorun, runInAction } from 'mobx';

import { useReposStore } from "./stores/hooks";
import ListItem from './Components/ListItem';
import FiltersBar from './Components/FiltersBar';

import { keyGenerator } from '../../Shared/helpers';


const createItems = list => 
    list.map(item => <ListItem data={item} key={keyGenerator()} />); 

const List = () => {
    const { repos, params, sortSettings, fetchRepos, setParams, setSortSettings } = useReposStore();

    //get params from localstorage
    useEffect(() => {
        autorun(() => {
            const json = localStorage.getItem("params");
            const _params = JSON.parse(json);
            if( _params){
                runInAction(()=>setParams("since", _params.since));
                runInAction(()=>setParams("language", _params.language));
            };
        })
    }, [setParams])

    //get sortSettings from localstorage
    useEffect(() => {
        autorun(()=>{
            const json = localStorage.getItem("sortSettings");
            const _sortSettings = JSON.parse(json);
            if( _sortSettings){
                runInAction(()=>setSortSettings(_sortSettings.sorting, _sortSettings.minmax));
            };
        })
    }, [setSortSettings])

    //save to localstorage
    useEffect(() => 
        autorun(() => {
            const json = JSON.stringify(params);
            if(!json) return;
            localStorage.setItem("params", json);
        }),
    [params])

    //save sortSettings to localestorage
    useEffect(() => 
        autorun(() => {
            const json = JSON.stringify(sortSettings);
            if(!json) return;
            localStorage.setItem("sortSettings", json);
        }),
    [sortSettings])

    //fetching repositories
    useEffect(() => {
        fetchRepos();
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