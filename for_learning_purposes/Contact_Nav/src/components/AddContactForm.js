import React from "react"
import { Button, KeyboardAvoidingView, TextInput, StyleSheet, Dimensions } from "react-native"
import PropTypes from 'prop-types'


class AddContactForm extends React.Component {

	static navigationOptions = {
		headerTitle: 'Add New Contact',
	}

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
            isFormValid: false,
        }
    }

    handleUpdate = key => {
		return (
			val => {
				this.setState({[key]: val})
			}
		)
	}

    componentDidUpdate(prevProps, prevState) {
		if (prevState.name !== this.state.name || prevState.phone !== this.state.phone) {
			this.validateForm()
		}
	}

	validateForm = () => {
		const formStatus = (
			String(parseInt(this.state.phone)) === this.state.phone 
			&& this.state.phone.length === 10 
			&& this.state.name.length >= 3
			&& this.state.name.trim().split(' ').length >= 2
		)
		// console.log(`state: ${JSON.stringify(this.state)}`)
		this.setState({isFormValid: formStatus})
	}

	handleSubmit = () => {
		if (this.state.isFormValid) {
			this.props.screenProps.addContactFunc(this.state)
			this.props.navigation.goBack()
		}
	}

    render() {
        return(
            <KeyboardAvoidingView behavior="padding">
                <TextInput value={this.state.name} onChangeText={this.handleUpdate('name')} 
					style={styles.textInput} />
				<TextInput value={this.state.phone} onChangeText={this.handleUpdate('phone')} 
					style={styles.textInput} keyboardType='numeric' />
				<Button title='Add' style={styles.button} onPress={this.handleSubmit} 
					disabled={!this.state.isFormValid} />
				<Button title='Cancel' style={styles.button} 
                    onPress={() => this.props.navigation.navigate('ContactsScreen')} />
            </KeyboardAvoidingView>
        )
    }
}

AddContactForm.propTypes = {
    navigation: PropTypes.object,
}

export default AddContactForm


const styles = StyleSheet.create({
	button: {
		margin: 10,
		width: 150,
	},

	textInput: {
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 3,
		padding: 5,
		marginHorizontal: 10,
		width: Dimensions.get('window').width - 100,
	},
})
