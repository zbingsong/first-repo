import PropTypes from 'prop-types';

import HorizontalScrollingBaseComponent from "./HorizontalScrollingBaseComponent";
import getTrendingAsync from "../../api/search/TrendingAPI";


export default function TrendingComponent(props) {
    return (
        <HorizontalScrollingBaseComponent
            navigate={props.navigate}
            params={props.params}
            api={getTrendingAsync}
            componentTitle='Trending This Week'
        />
    );
}


TrendingComponent.propTypes = {
    navigate: PropTypes.func,
    params: PropTypes.shape({
        posterSize: PropTypes.string,
        baseURL: PropTypes.string,
        genres: PropTypes.object,
        defaultImgAsset: PropTypes.string,
    }),
}
