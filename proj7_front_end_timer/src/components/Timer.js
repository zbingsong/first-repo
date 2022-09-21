import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'


const Timer = props => {
	return (
		<View style={styles.timerContainer}>
			<Text style={styles.timer}>
				{
					props.hour.toString().padStart(2, '0')
				} : {
					props.minute.toString().padStart(2, '0')
				} : {
					props.second.toString().padStart(2, '0')
				}
			</Text>
		</View>
	)
}

Timer.propTypes = {
	hour: PropTypes.number,
	minute: PropTypes.number,
	second: PropTypes.number,
}

export default Timer


const styles = StyleSheet.create({
	timer: {
		fontSize: 70,
		fontWeight: 'bold'
	},

	timerContainer: {
		margin: 15
	}
});
