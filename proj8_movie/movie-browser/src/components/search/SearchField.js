import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import PropTypes from 'prop-types';


export default function SearchField(props) {
    return (
        <View>
            <TextInput 
                value={props.value} 
                maxLength={50} 
                placeholder={props.placeholder} 
                onChangeText={props.update} 
                style={styles.textInput}
            />
        </View>
    );
}


SearchField.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    update: PropTypes.func,
}


const styles = StyleSheet.create({
    textInput: {
        width: Dimensions.get('window').width * 0.72,
        height: 42,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
    },
});
