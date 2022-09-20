import React from 'react'
import { StyleSheet, View } from 'react-native'
import Note from './src/components/Notification'


export default class App extends React.Component {
	render() {
		return (
			<Note />
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	}
});
