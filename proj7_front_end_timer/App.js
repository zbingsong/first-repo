import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import PropTypes, { element } from 'prop-types'
import { vibrate } from './utils'


const Timer = props => (
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

Timer.propTypes = {
	hour: PropTypes.number,
	minute: PropTypes.number,
	second: PropTypes.number,
}


const TimeInput = props => {
	return (<TextInput 
		type='text' 
		keyboardType='numeric' 
		value={props.inputValue} 
		editable={props.editable}
		onChangeText={props.handleInput} 
		onEndEditing={props.onEndEditing} 
		style={[{color: props.color}, styles.timeInputField]} 
	/>)
}

TimeInput.propTypes = {
	editable: PropTypes.bool,
	handleInput: PropTypes.func,
	inputValue: PropTypes.string,
	color: PropTypes.string,
	onEndEditing: PropTypes.func,
}


class TimeField extends React.Component {
	static propTypes = {
		ifCounting: PropTypes.bool,
		onTimeChange: PropTypes.func,
		checkIfValid: PropTypes.func,
	}

	constructor(props) {
		super(props)
		this.state = {
			time: {
				hour: '',
				minute: '',
				second: '',
			},
			color: {
				hour: 'black',
				minute: 'black',
				second: 'black',
			},
		}
	}

	checkInt = input => {
		return (
			input.length <= 2 
			&& !isNaN(+input)
			&& parseInt(+input) === +input
		)
	}

	handleHourInput = input => {
		// console.log('hour input changed')
		this.setState(prevState => ({
			time: {
				...prevState.time,
				hour: input
			},
			color: {
				...prevState.color,
				hour: (this.checkInt(input) 
					&& +input >= 0) 
					? 'black' : 'red'
			}
		}))
	}

	handleMinuteInput = input => {
		// console.log('minute input changed')
		this.setState(prevState => ({
			time: {
				...prevState.time,
				minute: input
			},
			color: {
				...prevState.color,
				minute: (this.checkInt(input) 
					&& +input >= 0 
					&& +input < 60) 
					? 'black' : 'red'
			}
		}))
	}

	handleSecondInput = input => {
		// console.log('second input changed')
		this.setState(prevState => ({
			time: {
				...prevState.time,
				second: input
			},
			color: {
				...prevState.color,
				second: (this.checkInt(input) 
					&& +input >= 0 
					&& +input < 60) 
					? 'black' : 'red'
			}
		}))
	}

	validateTime = () => {
		// console.log('check time validity')
		const checkColor = fieldColor => (fieldColor === 'black')
		// If all fields are black, meaning each field is good
		if (Object.values(this.state.color).every(checkColor)) {
			// Parse all fields to int
			const times = Object.values(this.state.time).map(x => +x)
			// console.log(times)
			// If not all fields are 0, go ahead and pass the time to App component
			// If all fields are 0, will lead to infinite loop in App.componentDidUpdate()
			if (times.reduce((sum, x) => (sum + x)) > 0) {
				// console.log('valid time')
				this.props.onTimeChange({
					hour: times[0],
					minute: times[1],
					second: times[2],
				})
				this.props.checkIfValid(true)
				return
			}
		}
		// console.log('invalid time')
		// console.log(this.state)
		this.props.checkIfValid(false)
	}

	formatValidInput = category => {
		// console.log('format input')
		// console.log(this.state)
		if (this.state.color[category] === 'black') {
			const formattedTime = (+this.state.time[category]).toString().padStart(2, '0')
			this.setState(prevState => ({
				time: {
					...prevState.time,
					[category]: formattedTime
				}
			}))
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (this.state !== prevState) {
			// console.log('TimeField component did update')
			// console.log(this.state)
			this.validateTime()
		}
	}

	render() {
		return (
			<View style={styles.timeInputFieldContainer}>
				<TimeInput 
					editable={!this.props.ifCounting}
					handleInput={this.handleHourInput} 
					inputValue={this.state.time.hour} 
					color={this.state.color.hour} 
					onEndEditing={() => this.formatValidInput('hour')}
				/>
				<Text style={styles.timeInputText}> : </Text>
				<TimeInput 
					editable={!this.props.ifCounting}
					handleInput={this.handleMinuteInput} 
					inputValue={this.state.time.minute} 
					color={this.state.color.minute} 
					onEndEditing={() => this.formatValidInput('minute')}
				/>
				<Text style={styles.timeInputText}> : </Text>
				<TimeInput 
					editable={!this.props.ifCounting}
					handleInput={this.handleSecondInput} 
					inputValue={this.state.time.second} 
					color={this.state.color.second} 
					onEndEditing={() => this.formatValidInput('second')}
				/>
			</View>
		)
	}
}


export default class App extends React.Component {
	constructor() {
		super()
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
			ifValidWorkTIme: false,
			ifValidBreakTIme: false,
			ifCounting: false,
			currCategory: 'work',
		}
	}

	setWorkTime = time => {
		// console.log('setting work time')
		// console.log({...time})
		// Timer always start with workTime, so set currTime the same as workTime
		this.setState(prevState => ({
			workTime: {...time}, 
			currTime: {...time}
		}))
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
			ifValidWorkTIme: ifValid
		})
	}

	setIfValidBreakTime = ifValid => {
		// console.log('setting break time validity')
		this.setState({
			ifValidBreakTIme: ifValid
		})
	}

	countDown = () => {
		this.setState(prevState => {
			if (prevState.currTime.second === 0) {
				if (prevState.currTime.minute === 0) {
					console.log('change hour')
					return {
						currTime: {
							hour: prevState.currTime.hour - 1,
							minute: 59,
							second: 59,
						}
					}
				} else {
					console.log('change minute')
					return {
						currTime: {
							...prevState.currTime,
							minute: prevState.currTime.minute - 1,
							second: 59,
						}
					}
				}
			} else {
				console.log('change second')
				return {
					currTime: {
						...prevState.currTime,
						second: prevState.currTime.second - 1,
					}
				}
			}
		}, 
		() => {
			// console.log('callback')
			// console.log(Object.values(this.state.currTime))
			// console.log(Object.values(this.state.currTime).every(value => (value === 0)))
			if (Object.values(this.state.currTime).every(value => (value === 0))) {
				console.log('should vibrate')
				this.switchTime()
			}
		})
	}

	// Need to avoid having workTime and breakTime both 0, or will lead to infinite loop
	// componentDidUpdate(prevProps, prevState) {
	// 	// console.log(this.state)
	// 	if (prevState !== this.state
	// 		&& this.state.workTime.ifValidTime
	// 		&& this.state.breakTime.ifValidTime 
	// 		&& this.state.ifCounting 
	// 		&& Object.values(this.state.currTime).every(value => (value === 0))
	// 	) {
	// 		this.switchTime()
	// 	}
	// }

	switchTime = () => {
		vibrate()
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

	// Format the inputs when hit Start
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
							!this.state.workTime.ifValidTime 
							|| !this.state.breakTime.ifValidTime 
							|| this.state.ifCounting
						} 
						onPress={this.startCountDown}
					/>
					<Button 
						title='Pause' 
						disabled={
							!this.state.workTime.ifValidTime 
							|| !this.state.breakTime.ifValidTime 
							|| !this.state.ifCounting
						} 
						onPress={this.pauseCountDown}
					/>
					<Button 
						title='Reset' 
						disabled={
							!this.state.workTime.ifValidTime 
							|| !this.state.breakTime.ifValidTime
						} 
						onPress={this.resetCountDown}
					/>
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

	timer: {
		fontSize: 64,
	},

	timerControls: {
		flexDirection: 'row',
		marginTop: 20,
	},

	timeInputContainer: {
		flexDirection: 'row',
		marginTop: 20,
	},

	timeInputField: {
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 2,
		width: 50,
		fontSize: 28,
		paddingHorizontal: 8,
	},

	timeInputLabel: {
		fontSize: 30,
		width: 100,
	},

	timeInputText: {
		fontSize: 30,
	},

	timeInputFieldContainer: {
		flexDirection: 'row',
	},
});
