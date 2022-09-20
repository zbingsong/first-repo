import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Vibration } from 'react-native'
import PropTypes from 'prop-types'
import TimeInput from './TimeInput'


export default class TimeField extends React.Component {
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
			const newHour = +this.state.time.hour
			const newMinute = +this.state.time.minute
			const newSecond = +this.state.time.second
			// console.log(times)
			// If not all fields are 0, go ahead and pass the time to App component
			// If all fields are 0, will lead to infinite loop in App.componentDidUpdate()
			if (newHour + newMinute + newSecond > 0) {
				// console.log('valid time')
				this.props.onTimeChange({
					hour: newHour,
					minute: newMinute,
					second: newSecond,
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


const styles = StyleSheet.create({
	timeInputText: {
		fontSize: 30,
	},

	timeInputFieldContainer: {
		flexDirection: 'row',
	},
});
