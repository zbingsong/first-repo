import { StyleSheet, View } from 'react-native';
import React from 'react';

import AppNavigator from './src/components/AppNavigator';


class App extends React.Component {

    constructor() {
        super()
        this.state = {
            contacts: []
        }
    }

    addContact = newContact => {
        this.setState(prevState => ({
            contacts: [...prevState.contacts, newContact,],
        }))
    }

    sortContacts = () => {
		this.setState(prevState => ({
			contacts: [...prevState.contacts].sort((a, b) => (a.name > b.name))
		}))
	}

    render() {
        return (
            <View style={styles.container}>
                <AppNavigator 
                    screenProps={
                        // everything in screenProps is passed implicitly to every screen in navigator
                        // Best used for non-changing props
                        {
                            contacts: this.state.contacts,
                            addContactFunc: this.addContact,
                            sortContactFunc: this.sortContacts,
                        }
                    }
                />
            </View>
        )
    }
}

export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 50 + Constants.statusBarHeight,
        padding: 10,
    },
});
