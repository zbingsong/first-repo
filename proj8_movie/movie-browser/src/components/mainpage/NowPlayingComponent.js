import PropTypes from 'prop-types';

import TabComponent from './TabComponent';
import getNowPlayingAsync from '../../api/search/NowPlayingAPI';


export default function NowPlayingComponent(props) {
    return (
        <TabComponent
            navigate={props.navigation.navigate}
            params={props.route.params}
            api={getNowPlayingAsync}
        />
    );
}


NowPlayingComponent.propTypes = {
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
