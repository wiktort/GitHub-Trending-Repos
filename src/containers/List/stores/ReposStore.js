import { makeAutoObservable, runInAction } from 'mobx';

import { getData } from '../../../Shared/api/getData';
import { createURL } from '../../../Shared/helpers';

class ReposStore {
    repos = {
        base: [],
        displayed: []
    }
    _params = {}

    constructor(){
        makeAutoObservable(this);
    }

    fetchRepos = () => {
        const url = createURL({params: this._params});
    
        getData(url)
        .then(data => {
            runInAction(()=>{
                this.repos.base = data;
                this.repos.displayed = data;
            });
        })
    }

    sortRepos = (sorting, minmax) => {
        if (!sorting) { 
            this.repos.displayed = [...this.repos.base];
            return;
        };
        const delta = [-1, 1][minmax];

        this.repos.displayed.sort((a,b) => (a.stars - b.stars) * delta);
    }
};

export default ReposStore;