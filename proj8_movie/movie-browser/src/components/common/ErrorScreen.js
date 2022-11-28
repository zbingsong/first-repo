import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';


export default function ErrorScreen(props) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: props.errorImgAsset }} style={styles.image} />
            <Text>{props.message}</Text>
        </View>
    )
}


ErrorScreen.propTypes = {
    errorImgAsset: PropTypes.string,
    message: PropTypes.string,
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
