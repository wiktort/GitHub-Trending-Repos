import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const MyLoader = () => (
    <Loader
            type="ThreeDots"
            color="#84001D"
            height={100}
            width={100}
            timeout={3000}
    />
);

export default MyLoader;