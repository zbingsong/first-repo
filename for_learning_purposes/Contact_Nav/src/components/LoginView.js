import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import PropTypes from 'prop-types'

class LoginView extends React.Component {

    static navigationOptions = {
        headerTitle: 'Login'
    }

    login = () => {
        // Some login logic here
        // Can explicitly navigate to a screen under MainNavigator by 
        // 1. navigate('Main', { screen: 'ContactsView' }), or
        // 2. navigate('ContactsView')
        this.props.navigation.navigate('Main')
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    You are currently logged out.
                </Text>
                <Button title='Press to log in' onPress={this.login} />
            </View>
        )
    }
}

LoginView.propTypes = {
    navigation: PropTypes.object,
}

export default LoginView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})