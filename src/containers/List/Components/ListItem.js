
const ListItem = ({data}) => {
    const { author, name, language, stars } = data;
    return(
        <div>
            <p>Author: {author} </p>
            <p>Name: {name}</p>
            <p>Language: {language}</p>
            <p>Stars: {stars}</p>
        </div>
    )

};

export default ListItem;