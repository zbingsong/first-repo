import PropTypes from 'prop-types';

import HorizontalScrollingBaseComponent from "./ScrollingBaseComponent";
import getTrendingAsync from "../../api/search/TrendingAPI";


export default function TrendingComponent(props) {
    // console.log(props);
    return (
        <HorizontalScrollingBaseComponent
            navigate={props.navigation.navigate}
            params={props.route.params}
            api={getTrendingAsync}
            componentTitle='Trending This Week'
        />
    );
}


TrendingComponent.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        params: PropTypes.shape({
            posterSize: PropTypes.string,
            baseURL: PropTypes.string,
            genres: PropTypes.object,
            defaultImgAsset: PropTypes.string,
            loadingImgAsset: PropTypes.string,
            errorImgAsset: PropTypes.string,
        }),
    }),
}
