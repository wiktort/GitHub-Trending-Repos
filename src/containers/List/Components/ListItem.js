
const ListItem = ({data}) => {
    const { author, name, language } = data;
    return(
        <div>
            <p>Author: {author} </p>
            <p>Name: {name}</p>
            <p>Language: {language}</p>
        </div>
    )

};

export default ListItem;