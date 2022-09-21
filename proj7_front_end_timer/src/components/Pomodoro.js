import React from 'react'
import { StyleSheet, View } from 'react-native'
import SetTimer from './SetTimer'
import TimerControls from './TimerControls'
import Timer from './Timer'
import Header from './Header'
import Instructions from './Instructions'


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
			ifSettingTime: true,
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
			if (this.state.currTime.hour === 0 
				&& this.state.currTime.minute === 0
				&& this.state.currTime.second === 0) {
				// console.log('should vibrate')
				clearInterval(this.interval)
				this.props.sendNotification(this.state.currCategory)
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
			ifSettingTime: false
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
			ifCounting: false,
			ifSettingTime: true
		}))
		clearInterval(this.interval)
	}

	render() {
		return (
			<View style={styles.container}>

				<Header 
					category={this.state.currCategory}
					ifSettingTime={this.state.ifSettingTime}
				/>

				<Timer 
					hour={this.state.currTime.hour} 
					minute={this.state.currTime.minute} 
					second={this.state.currTime.second} 
				/>

				<SetTimer 
					ifSettingTime={this.state.ifSettingTime}
					setWorkTime={this.setWorkTime}
					setBreakTime={this.setBreakTime}
					setIfValidWorkTime={this.setIfValidWorkTime}
					setIfValidBreakTime={this.setIfValidBreakTime}
				/>

				<TimerControls 
					startCountDown={this.startCountDown}
					pauseCountDown={this.pauseCountDown}
					resetCountDown={this.resetCountDown}
					ifValidTime={this.state.ifValidWorkTime && this.state.ifValidBreakTime}
					ifCounting={this.state.ifCounting}
				/>

				<Instructions />

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
	}
})
