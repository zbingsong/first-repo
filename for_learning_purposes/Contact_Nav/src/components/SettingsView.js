import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class SettingsView extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.container}>
                    Settings
                </Text>
            </View>
        )
    }
}

export default SettingsView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
