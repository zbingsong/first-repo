import PropTypes from 'prop-types';

import searchForMoviesAsync from "../../api/search/SearchAPI";
import MovieSummary from "./MovieSummary";
import ScrollingBaseComponent from "../common/ScrollingBaseComponent";


export default function ResultScreen(props) {

    const movieSummaryParams = {
        posterSize: props.route.params.posterSize,
        baseURL: props.route.params.baseURL,
        genres: props.route.params.genres,
        defaultImgAsset: props.route.params.defaultImgAsset,
    }

    const renderItem = ({ item }) => (
        <MovieSummary 
            movie={item} 
            navigateToDetail={id => props.navigation.navigate('Detail', {id: id})} 
            params={movieSummaryParams}
        />
    );

    return (
        <ScrollingBaseComponent
            api={async (page) => await searchForMoviesAsync(props.route.params.title, page)}
            renderItem={renderItem}
            loadingImgAsset={props.route.params.loadingImgAsset}
            errorImgAsset={props.route.params.errorImgAsset}
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
