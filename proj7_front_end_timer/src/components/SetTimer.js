import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import TimeField from './TimeField'

const SetTimer = props => (
    <View style={styles.setTimerContainer}>

        <View style={styles.timeInputContainer}>
            <Text style={styles.timeInputLabel}>Work:</Text>
            <TimeField 
                ifSettingTime = {props.ifSettingTime}
                onTimeChange={props.setWorkTime} 
                checkIfValid={props.setIfValidWorkTime} 
            />
        </View>

        <View style={styles.timeInputContainer}>
            <Text style={styles.timeInputLabel}>Break: </Text>
            <TimeField 
                ifSettingTime = {props.ifSettingTime} 
                onTimeChange={props.setBreakTime} 
                checkIfValid={props.setIfValidBreakTime} 
            />
        </View>
        
    </View>
)

SetTimer.propTypes = {
    ifSettingTime: PropTypes.bool,
    setWorkTime: PropTypes.func,
    setBreakTime: PropTypes.func,
    setIfValidWorkTime: PropTypes.func,
    setIfValidBreakTime: PropTypes.func
}

export default SetTimer


const styles = StyleSheet.create({
    setTimerContainer: {
        margin: 10,
    },

	timeInputContainer: {
		flexDirection: 'row',
		margin: 10,
	},

	timeInputLabel: {
		fontSize: 30,
		width: 100,
	}
})