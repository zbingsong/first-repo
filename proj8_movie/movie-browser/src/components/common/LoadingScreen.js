import { View, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';


export default function LoadingScreen(props) {
    // console.log(props);
    return (
        <View style={styles.container}>
            <Image source={{ uri: props.loadingImgAsset }} style={styles.image} />
        </View>
    );
}


LoadingScreen.propTypes = {
    loadingImgAsset: PropTypes.string,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 100,
        height: 100,
    },
});
