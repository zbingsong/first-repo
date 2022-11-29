import PropTypes from 'prop-types';

import ScrollingBaseComponent from "./ScrollingBaseComponent";
import getTopRatedAsync from '../../api/search/TopRatedAPI';


export default function TopRatedComponent(props) {
    // console.log(props);
    return (
        <ScrollingBaseComponent
            navigate={props.navigation.navigate}
            params={props.route.params}
            api={getTopRatedAsync}
            componentTitle='Top Rated'
        />
    );
}


TopRatedComponent.propTypes = {
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
