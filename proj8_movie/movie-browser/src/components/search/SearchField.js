import { View, Text, TextInput, StyleSheet } from "react-native";
import PropTypes from 'prop-types';


export default function SearchField(props) {
    return (
        <View style={styles.container}>
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
    container: {
        marginVertical: 10,
    },

    textInput: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
    },
});
