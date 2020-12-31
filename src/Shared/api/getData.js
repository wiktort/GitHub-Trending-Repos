
export const getData = async (url) => {
    return await fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                Promise.reject(response);
            }
        })
        .catch(err => {
            console.warn('Error', err);
            return [];
        });
};