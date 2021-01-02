import { makeAutoObservable, runInAction } from 'mobx';

import { getData } from '../../../Shared/api/getData';
import { createURL } from '../../../Shared/helpers';

class ReposStore {
    repos = {
        base: [],
        displayed: [],
        noData: false
    }

    params = {}

    sortSettings = {
        sorting: false,
        minmax: -1
    }

    constructor(){
        makeAutoObservable(this);
    }

    fetchRepos = () => {
        const url = createURL({params: this.params});
        getData(url)
        .then(data => {
            runInAction(()=>{
                this.repos.noData = data.length <= 0
                    ? true
                    : false;
                this.repos.base = data;
                this.repos.displayed = data;
                this.sortRepos();
            });
        })
    }

    setParams = (param, value) => this.params[param] = value

    setSortSettings = (sorting, minmax) => {
        this.sortSettings.sorting = sorting;
        this.sortSettings.minmax = minmax;
    }

    sortRepos = () => {
        const { sorting, minmax } = this.sortSettings;
        if (!sorting) { 
            this.repos.displayed = [...this.repos.base];
            return;
        };
        const delta = [-1, 1][minmax];
        this.repos.displayed.sort((a,b) => (a.stars - b.stars) * delta);
    }
};

export default ReposStore;
