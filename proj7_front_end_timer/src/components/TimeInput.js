import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import PropTypes from 'prop-types'


const TimeInput = props => {
	return (<TextInput 
		type='text' 
		keyboardType='numeric' 
		value={props.inputValue} 
		placeholder='00'
		textAlign={'center'}
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

export default TimeInput


const styles = StyleSheet.create({
	timeInputField: {
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 4,
		width: 64,
		height: 42,
		fontSize: 28,
		paddingHorizontal: 6,
	}
});
