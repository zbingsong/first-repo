import React from "react"
import { View, Button, SectionList, StyleSheet, Text, TouchableOpacity } from "react-native"
import PropTypes from 'prop-types'


class ContactView extends React.Component {

	/*
		To dynamically adjust navigationOptions, make navigationOptions a function:
		static navigationOptions = ({ navigation, screenProps, navigationOptions }) => { return ... }
		this is the only way to access props.navigation in this static object
		must return an object
	 */
	static navigationOptions = ({ navigation }) => ({
		headerTitle: 'All Contacts',
		headerRight: () => (<Button title="Add" style={styles.button} 
						onPress={() => navigation.navigate('AddContactFormScreen')} />)
	})

    constructor(props) {
        super(props)
    }

	renderItem = ({ item }) => (
		<TouchableOpacity style={styles.contactContainer} 
			onPress={() => {
				this.props.navigation.navigate('ContactDetailScreen', {name: item.name, phone: item.phone})
			}}>
			<Text>{item.name} </Text>
			<Text>{item.phone}</Text>
		</TouchableOpacity>
	)

	renderSectionHeader = ({ section: {title} }) => (
		<Text style={styles.header}>{title}</Text>
	)

    groupContacts = contacts => contacts.reduce(
		(obj, contact) => {
			const firstLetter = contact.name[0].toUpperCase()
			// ...(obj[firstLetter] || []) is to handle the case where obj[firstLetter] is undefined
			return {
				...obj,
				[firstLetter]: [
					...(obj[firstLetter] || []),
					contact,
				],
			}
		}, 
		{}
	)

    render() {
        const contactsByLetter = this.groupContacts(this.props.screenProps.contacts)

        const sections = Object.keys(contactsByLetter).sort().map(letter => ({
            title: letter,
            data: contactsByLetter[letter]
        }))

        return (
            <View>
				<Text>
					Some text
				</Text>
                <SectionList renderItem={this.renderItem} sections={sections} 
                    renderSectionHeader={this.renderSectionHeader} />
            </View>
        )
    }
}

ContactView.propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.shape({
		contacts: PropTypes.arrayOf(PropTypes.object),
		addContactFunc: PropTypes.func,
		sortContactFunc: PropTypes.func,
	}),
}

export default ContactView


const styles = StyleSheet.create({
	contactContainer: {
		flexDirection: 'row',
		marginTop: 10,
		justifyContent: 'center',
	},

	header: {
		fontSize: 24,
		justifyContent: 'flex-start',
	},

	button: {
		margin: 10,
		width: 150,
	},
})