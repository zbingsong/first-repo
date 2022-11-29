import PropTypes from 'prop-types';

import ScrollingBaseComponent from "./ScrollingBaseComponent";
import getUpcomingAsync from '../../api/search/UpcomingAPI';


export default function UpcomingComponent(props) {
    return (
        <ScrollingBaseComponent
            navigate={props.navigation.navigate}
            params={props.route.params}
            api={getUpcomingAsync}
            componentTitle='Upcoming next month'
        />
    );
}


UpcomingComponent.propTypes = {
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
