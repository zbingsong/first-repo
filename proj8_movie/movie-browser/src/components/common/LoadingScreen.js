import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';


export default function LoadingScreen(props) {
    console.log(props);
    return (
        <View style={styles.container}>
            <Image source={{ uri: props.loadingImgAsset }} style={styles.image} />
            <Text>Loading...</Text>
        </View>
    );
}


LoadingScreen.propTypes = {
    loadingImgAsset: PropTypes.string,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    image: {
        width: 300,
        height: 300,
    },
});
