import React from 'react'
import { View, Text, Button } from 'react-native'
import PropTypes from 'prop-types'


class ContactDetail extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        // Use navigation.getParam() to get the custom params passed into navigator
        headerTitle: `Detail of ${navigation.getParam('name', 'Unknown')}`
    })

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>Name: {this.props.navigation.getParam('name')}</Text>
                <Text>Phone: {this.props.navigation.getParam('phone')}</Text>
                <Button title='Return to Contacts' 
                    onPress={() => this.props.navigation.navigate('ContactsScreen')}/>
            </View>
        )
    }
}

export default ContactDetail

ContactDetail.propTypes = {
    navigation: PropTypes.object,
}
