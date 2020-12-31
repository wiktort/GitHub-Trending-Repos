import ReposStore from './ReposStore';

export default function RootStore(){
    return {
        reposStore: new ReposStore(),
    }
};