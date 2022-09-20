import React from 'react'
import { StyleSheet, Text, View, Button, Vibration } from 'react-native'
import TimeField from './TimeField'
import Timer from './Timer'


export default class Pomodoro extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			workTime: {
				hour: 0,
				minute: 0,
				second: 0,
			},
			breakTime: {
				hour: 0,
				minute: 0,
				second: 0,
			},
			currTime: {
				hour: 0,
				minute: 0,
				second: 0,
			},
			ifValidWorkTime: false,
			ifValidBreakTime: false,
			ifCounting: false,
			currCategory: 'work',
		}
	}

	setWorkTime = time => {
		// Timer always start with workTime, so set currTime the same as workTime
		this.setState({
			workTime: {...time}, 
			currTime: {...time}
		})
	}

	setBreakTime = time => {
		// console.log('setting break time')
		this.setState({
			breakTime: {...time}
		})
	}

	setIfValidWorkTime = ifValid => {
		// console.log('setting work time validity')
		this.setState({
			ifValidWorkTime: ifValid
		})
	}

	setIfValidBreakTime = ifValid => {
		// console.log('setting break time validity')
		this.setState({
			ifValidBreakTime: ifValid
		})
	}

	countDown = () => {
		this.setState(prevState => {
			if (prevState.currTime.second === 0) {
				if (prevState.currTime.minute === 0) {
					// console.log('change hour')
					return {
						currTime: {
							hour: prevState.currTime.hour - 1,
							minute: 59,
							second: 59,
						}
					}
				} else {
					// console.log('change minute')
					return {
						currTime: {
							...prevState.currTime,
							minute: prevState.currTime.minute - 1,
							second: 59,
						}
					}
				}
			} else {
				// console.log('change second')
				return {
					currTime: {
						...prevState.currTime,
						second: prevState.currTime.second - 1,
					}
				}
			}
		}, 
		() => {
			if (Object.values(this.state.currTime).every(value => (value === 0))) {
				// console.log('should vibrate')
				clearInterval(this.interval)
				this.props.sendNotification()
				// this.switchTime()
				// sendNotification() has a 5-second delay for unknown reason
				setTimeout(() => {this.startCountDown(); this.switchTime()}, 5000)
			}
		})
	}

	switchTime = () => {
		// Vibration.vibrate(500)
		if (this.state.currCategory === 'work') {
			this.setState(prevState => ({
				currTime: {...prevState.breakTime},
				currCategory: 'break'
			}))
		} else {
			this.setState(prevState => ({
				currTime: {...prevState.workTime},
				currCategory: 'work'
			}))
		}
	}

	startCountDown = () => {
		this.setState({
			ifCounting: true,
		})
		this.interval = setInterval(this.countDown, 1000)
	}

	pauseCountDown = () => {
		this.setState({
			ifCounting: false
		})
		clearInterval(this.interval)
	}

	resetCountDown = () => {
		this.setState(prevState => ({
			currTime: {...prevState.workTime},
			ifCounting: false
		}))
		clearInterval(this.interval)
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Timer 
						hour={this.state.currTime.hour} 
						minute={this.state.currTime.minute} 
						second={this.state.currTime.second} 
					/>
				</View>
				<View style={styles.timeInputContainer}>
					<Text style={styles.timeInputLabel}>Work:</Text>
					<TimeField 
						ifCounting = {this.state.ifCounting}
						onTimeChange={this.setWorkTime} 
						checkIfValid={this.setIfValidWorkTime} 
					/>
				</View>
				<View style={styles.timeInputContainer}>
					<Text style={styles.timeInputLabel}>Break: </Text>
					<TimeField 
						ifCounting = {this.state.ifCounting} 
						onTimeChange={this.setBreakTime} 
						checkIfValid={this.setIfValidBreakTime} 
					/>
				</View>
				<View style={styles.timerControls}>
					<Button 
						title='Start' 
						disabled={
							!this.state.ifValidWorkTime 
							|| !this.state.ifValidBreakTime 
							|| this.state.ifCounting
						} 
						onPress={this.startCountDown}
					/>
					<Button 
						title='Pause' 
						disabled={
							!this.state.ifValidWorkTime 
							|| !this.state.ifValidBreakTime 
							|| !this.state.ifCounting
						} 
						onPress={this.pauseCountDown}
					/>
					<Button 
						title='Reset' 
						disabled={
							!this.state.ifValidWorkTime 
							|| !this.state.ifValidBreakTime
						} 
						onPress={this.resetCountDown}
					/>
					{/* <Button title='test' onPress={this.props.sendNotification} /> */}
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	timerControls: {
		flexDirection: 'row',
		marginTop: 20,
	},

	timeInputContainer: {
		flexDirection: 'row',
		marginTop: 20,
	},

	timeInputLabel: {
		fontSize: 30,
		width: 100,
	}
});
