import config from '../../config/config';

const settings = {
    language: "language=",
    languages: "languages",
    repositories: "repositories",
    since: "since="
};

const addParams = ({language, since}) => {
    const base = (language || since ? '?' : "");
    const withParams = base +
    (language ? `${settings.language}${language}&` : "") +
    (since ? `${settings.since}${since}` : "");
    
    return withParams;
};

const createNewPath = ({params, languages}) => {
    
    const newPath = languages 
    ? settings.languages
    : settings.repositories + addParams(params);

    return newPath;
};

export const createURL = (data) => {
    const url = config.local.LOCAL_BASE_URL;
    return url + createNewPath(data);
};