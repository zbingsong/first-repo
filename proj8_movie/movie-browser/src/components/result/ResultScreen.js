import PropTypes from 'prop-types';

import searchForMoviesAsync from "../../api/search/SearchAPI";
import SingleColScrollingComponent from "./SingleColScrollingComponent";


export default function ResultScreen(props) {
    return (
        <SingleColScrollingComponent
            api={async (page) => await searchForMoviesAsync(props.route.params.title, page)}
            navigation={props.navigation}
            route={props.route}
        />
    );
}


ResultScreen.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        params: PropTypes.shape({
            title: PropTypes.string,
            posterSize: PropTypes.string,
            baseURL: PropTypes.string,
            genres: PropTypes.object,
            defaultImgAsset: PropTypes.string,
            loadingImgAsset: PropTypes.string,
            errorImgAsset: PropTypes.string,
        }),
    }),
}
