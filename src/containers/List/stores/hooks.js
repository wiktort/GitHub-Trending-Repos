import { useContext } from "react";

import { StoreContext } from "./StoreProvider";


export function useReposStore(){
    const rootStore = useContext(StoreContext);

    if(!rootStore){
        throw new Error ("Couldn't find RootStore...");
    };

    return rootStore.reposStore;
};