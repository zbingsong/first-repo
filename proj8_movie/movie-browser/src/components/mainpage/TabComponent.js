import PropTypes from 'prop-types';

import ScrollingBaseComponent from "../common/ScrollingBaseComponent";
import MovieItem from './MovieItem';


export default function TabComponent(props) {
    // console.log(props);
    const movieItemParams = {
        posterSize: props.params.posterSize,
        baseURL: props.params.baseURL,
        defaultImgAsset: props.params.defaultImgAsset,
    }

    const renderItem = ({ item }) => (
        <MovieItem 
            movie={item}
            navigateToDetail={id => props.navigate('Detail', {id: id})}
            params={movieItemParams}
        />
    );

    return (
        <ScrollingBaseComponent
            api={props.api}
            renderItem={renderItem}
            loadingImgAsset={props.params.loadingImgAsset}
            errorImgAsset={props.params.errorImgAsset}
        />
    );
}


TabComponent.propTypes = {
    navigate: PropTypes.func,
    params: PropTypes.shape({
        posterSize: PropTypes.string,
        baseURL: PropTypes.string,
        genres: PropTypes.object,
        defaultImgAsset: PropTypes.string,
        loadingImgAsset: PropTypes.string,
        errorImgAsset: PropTypes.string,
    }),
    api: PropTypes.func,
}
