import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Vibration } from 'react-native'
import PropTypes from 'prop-types'


export default function TimeInput(props) {
	return (<TextInput 
		type='text' 
		keyboardType='numeric' 
		value={props.inputValue} 
		placeholder='00'
		editable={props.editable}
		onChangeText={props.handleInput} 
		onEndEditing={props.onEndEditing} 
		style={[{color: props.color}, styles.timeInputField]} 
	/>)
}

TimeInput.propTypes = {
	editable: PropTypes.bool,
	handleInput: PropTypes.func,
	inputValue: PropTypes.string,
	color: PropTypes.string,
	onEndEditing: PropTypes.func,
}


const styles = StyleSheet.create({
	timeInputField: {
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 2,
		width: 50,
		fontSize: 26,
		paddingHorizontal: 8,
	}
});
