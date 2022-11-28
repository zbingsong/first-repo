import PropTypes from 'prop-types';

import HorizontalScrollingBaseComponent from "./HorizontalScrollingBaseComponent";
import getTopRatedAsync from '../../api/search/TopRatedAPI';


export default function TopRatedComponent(props) {
    return (
        <HorizontalScrollingBaseComponent
            navigate={props.navigate}
            params={props.params}
            api={getTopRatedAsync}
            componentTitle='Top Rated'
        />
    );
}


TopRatedComponent.propTypes = {
    navigate: PropTypes.func,
    params: PropTypes.shape({
        posterSize: PropTypes.string,
        baseURL: PropTypes.string,
        genres: PropTypes.object,
        defaultImgAsset: PropTypes.string,
    }),
}
