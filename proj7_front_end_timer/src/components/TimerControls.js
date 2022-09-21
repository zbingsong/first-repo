import React from 'react'
import { StyleSheet, View, Button, Pressable, Text } from 'react-native'
import PropTypes from 'prop-types'


const TimerControls = props => (
    <View style={styles.timerControls}>
        {
            (props.ifValidTime && !props.ifCounting) ? 
            (
                // Enable button
                <Pressable 
                    onPress={props.startCountDown}
                    style={[styles.button, styles.buttonActive]}
                >
                    <Text style={[styles.buttonTitle, styles.buttonTitleActive]}>Start</Text>
                </Pressable>
            ) : (
                // Disable button
                <Pressable 
                    disabled={true} 
                    onPress={props.startCountDown}
                    style={[styles.button, styles.buttonDisabled]}
                >
                    <Text style={[styles.buttonTitle, styles.buttonTitleDisabled]}>Start</Text>
                </Pressable>
            )
        }

        {
            (props.ifValidTime && props.ifCounting) ? 
            (
                // Enable button
                <Pressable 
                    onPress={props.pauseCountDown}
                    style={[styles.button, styles.buttonActive]}
                >
                    <Text style={[styles.buttonTitle, styles.buttonTitleActive]}>Pause</Text>
                </Pressable>
            ) : (
                // Disable button
                <Pressable 
                    disabled={true} 
                    onPress={props.pauseCountDown}
                    style={[styles.button, styles.buttonDisabled]}
                >
                    <Text style={[styles.buttonTitle, styles.buttonTitleDisabled]}>Pause</Text>
                </Pressable>
            )
        }

        {
            (props.ifValidTime) ? 
            (
                // Enable button
                <Pressable 
                    onPress={props.resetCountDown}
                    style={[styles.button, styles.buttonActive]}
                >
                    <Text style={[styles.buttonTitle, styles.buttonTitleActive]}>Reset</Text>
                </Pressable>
            ) : (
                // Disable button
                <Pressable 
                    disabled={true} 
                    onPress={props.resetCountDown}
                    style={[styles.button, styles.buttonDisabled]}
                >
                    <Text style={[styles.buttonTitle, styles.buttonTitleDisabled]}>Reset</Text>
                </Pressable>
            )
        }
    </View>
)

TimerControls.propTypes = {
    startCountDown: PropTypes.func,
    pauseCountDown: PropTypes.func,
    resetCountDown: PropTypes.func,
    ifValidTime: PropTypes.bool,
    ifCounting: PropTypes.bool,
}

export default TimerControls


const styles = StyleSheet.create({
	timerControls: {
		flexDirection: 'row',
		margin: 15,
	},

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginHorizontal: 12,
        borderRadius: 4,
        elevation: 2,
    },

    buttonActive: {
        backgroundColor: 'black',
    },

    buttonDisabled: {
        backgroundColor: '#e5e5e5',
    },

    buttonTitle: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },

    buttonTitleActive: {
        color: 'white'
    },

    buttonTitleDisabled: {
        color: '#afafaf'
    }
})