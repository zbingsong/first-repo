import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
// import { createBottomTabNavigator } from 'react-navigation-tabs'
import PropTypes from 'prop-types'

import ContactView from './ContactView'
import AddContactForm from './AddContactForm'
import ContactDetail from './ContactDetail'
import LoginView from './LoginView'
import SettingsView from './SettingsView'

/*
    createSwitchNavigator is more rudimentary
    */
// const AppNavigator = createAppContainer(
//     createSwitchNavigator(
//         {
//             ContactsScreen: ContactView,
//             AddContactFormScreen: AddContactForm,
//         },
//         {
//             initialRouteName: 'ContactsScreen'
//         }
//     )
// )

class TestScreen extends React.Component {

    static navigationOptions = {
        // Header is a separate component which cannot be modified by usual component methods
        // Must specify/modify in navigationOptions
        // headerTitle can also be a Component (Button, image, ...)
        headerTitle: 'Test Screen',
        headerRight: <Button title="Press" onPress={() => alert('Pressed')} />,
    }

    render() {
        // console.log(this.props)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    Home
                </Text>
                <Button 
                    title='Go to login' 
                    // Use navigation.navigate() to go to a different screen
                    // To go to the same screen but with different parameters (e.g, for one-page app),
                    // use navigation.push()
                    onPress={() => this.props.navigation.navigate('Login')} 
                />
            </View>
        )
    }
}

const ContactNavigator = createStackNavigator(
    {
        ContactsScreen: ContactView,
        ContactDetailScreen: ContactDetail,
        AddContactFormScreen: AddContactForm
    },
    {
        initialRouteName: 'ContactsScreen'
    }
)

// const MainNavigator = createBottomTabNavigator(
//     {
//         Contact: ContactNavigator,
//         Settings: SettingsView
//     },
//     {
//         tabBarOptions: {
//             activeTintColor: 'yellow'
//         }
//     }
// )

// The higher order navigator that forces the user to log in before having access to MainNavigator
const AppNavigator = createSwitchNavigator(
    {
        Home: TestScreen,
        Login: LoginView,
        Main: ContactNavigator
    },
    {
        initialRouteName: 'Home'
    }
)


AppNavigator.propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.shape({
		contacts: PropTypes.arrayOf(PropTypes.object),
		addContactFunc: PropTypes.func,
		sortContactFunc: PropTypes.func,
	}),
}

export default createAppContainer(AppNavigator)
