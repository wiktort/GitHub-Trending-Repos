import { makeAutoObservable, runInAction } from 'mobx';
// import { makeObservable, observable, computed, action } from "mobx"

import { getData } from '../../../Shared/api/getData';
import { createURL } from '../../../Shared/helpers';

class ReposStore {
    repos = []
    _params = {}

    constructor(){
        makeAutoObservable(this)
    }

    fetchRepos = () => {
        const url = createURL({params: this._params})
    
        getData(url)
        .then(data => {
            runInAction(()=>this.repos = data);
        })
    }
};

export default ReposStore;