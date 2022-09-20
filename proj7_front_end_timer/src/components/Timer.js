import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'


export default function Timer(props) {
	return (
		<View>
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


const styles = StyleSheet.create({
	timer: {
		fontSize: 64,
	}
});
