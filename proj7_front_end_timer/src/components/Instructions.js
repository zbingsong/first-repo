import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Instructions = () => (
    <View style={styles.instructionsContainer}>
        <Text>
            Enter a working time and a break time of your choice and hit Start!
            To pause the timer, press Pause.
            To reset timer or reset working or break time, press Reset.
        </Text>
    </View>
)

export default Instructions

const styles = StyleSheet.create({
    instructionsContainer: {
        marginHorizontal: 50,
        marginTop: 50,
        flexShrink: 1,
        alignContent: 'center'
    },

    buttonLike: {

    }
})