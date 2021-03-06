import { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { autorun, runInAction } from 'mobx';
import styled from 'styled-components';

import { useReposStore } from "./stores/hooks";
import ListItem from './Components/ListItem';
import FiltersBar from './Components/FiltersBar';
import MyLoader from '../../Shared/Loader';

import { keyGenerator } from '../../Shared/helpers';

const createItems = ({ displayed, noData }) => {
    return noData
        ? <li>It seems there are no trending repositories for your request. Please try to modify it or to refresh this page.</li> 
        : displayed.map(item => <ListItem data={item} key={keyGenerator()} />); 
}
    

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
    }, [setParams]);

    //get sortSettings from localstorage
    useEffect(() => {
        autorun(()=>{
            const json = localStorage.getItem("sortSettings");
            const _sortSettings = JSON.parse(json);
            if( _sortSettings){
                runInAction(()=>setSortSettings(_sortSettings.sorting, _sortSettings.minmax));
            };
        })
    }, [setSortSettings]);

    //save to localstorage
    useEffect(() => 
        autorun(() => {
            const json = JSON.stringify(params);
            if(!json) return;
            localStorage.setItem("params", json);
        }),
    [params]);

    //save sortSettings to localestorage
    useEffect(() => 
        autorun(() => {
            const json = JSON.stringify(sortSettings);
            if(!json) return;
            localStorage.setItem("sortSettings", json);
        }),
    [sortSettings]);

    //fetching repositories
    useEffect(() => {
        autorun(()=>{
            fetchRepos();
        })
    },[fetchRepos]);
    
    const showRepos = repos.loading || !repos.displayed
        ? <MyLoader />
        : createItems(repos);

    return (
        <StyledWrapper>
            <FiltersBar />
            <StyledUl aria-live="polite">
                {showRepos}
            </StyledUl>
        </StyledWrapper>
    );
};

export default observer(List);

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
`;

const StyledUl = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    width: 100%;
`;