import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { vibrate } from './utils';

const Timer = props => (
	<div>

	</div>
)

class TimeField extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			time: {
				hour: 0,
				minute: 0,
				second: 0,
			},
			color: {
				hour: "black",
				minute: "black",
				second: "black"
			},
		}
		this.handleInput = this.handleInput.bind(this)
	}

	checkInt(input) {
		return parseInt(input).toString() === input
	}

	handleInput(event, category) {
		let input = event.target.value
		if (this.checkInt(input)) {
			input = parseInt(input)
			if (input >= 0) {
				if (category === "hour" || input < 60) {
					this.setState({
						...this.state,
						time: {
							...this.state.time,
							[category]: input,
						},
						color: {
							...this.state.color,
							[category]: "black",
						},
					})
					this.props.onTimeChange(this.state.time)
				}
			}
		}
		this.setState({
			...this.state,
			color: {
				...this.state.color,
				[category]: "red",
			},
		})
		this.props.onTimeChange("")
	}

	render() {
		return (
			<View>
				<input type="text" onChange={event => this.handleHourInput(event, "hour")} style={{color: this.state.color.hour}} /> : 
				<input type="text" onChange={event => this.handleHourInput(event, "minute")} style={{color: this.state.color.hour}} /> :
				<input type="text" onChange={event => this.handleHourInput(event, "second")} style={{color: this.state.color.hour}} />
			</View>
		)
	}
}


export default class App extends React.Component {
	constructor() {
		super()
		this.state = {
			work_time: {
				hour: 0,
				minute: 0,
				second: 0,
			},
			break_time: {
				hour: 0,
				minute: 0,
				second: 0,
			},
			curr_time: 0,
			if_legal_time: true,
			if_counting: false,
		}
		this.setWorkTime = this.setWorkTime.bind(this)
		this.setBreakTime = this.setBreakTime.bind(this)
		this.startCountDown = this.startCountDown.bind(this)
		this.pauseCountDown = this.pauseCountDown.bind(this)
		this.resetCountDown = this.resetCountDown.bind(this)
		this.ring = this.ring.bind(this)
	}

	setTime(time, type) {
		if (typeof time !== "string") {
			this.setState({
				...this.state,
				[type]: time,
				if_legal_time: true,
			})
		} else {
			this.setState({
				...this.state,
				if_legal_time: false
			})
		}
	}

	setWorkTime(time) {
		this.setTime(time, "work_time")
		this.setState({
			...this.state,
			curr_time: time.hour * 3600 + time.minute * 60 + time.second,
		})
	}

	setBreakTime(time) {
		this.setTime(time, "break_time")
	}

	startCountDown() {
		this.setState({
			...this.state,
			if_counting: true
		})
	}

	pauseCountDown() {
		this.setState({
			...this.state,
			if_counting: false
		})
	}

	resetCountDown() {
		this.setState({
			...this.state,
			if_counting: false
		})
	}

	ring() {
		vibrate()
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Timer />
				</View>
				<View>
					<Text>Work:</Text>
					<TimeField onTimeChange={this.setWorkTime} />
				</View>
				<View>
					<Text>Break: </Text>
					<TimeField onTimeChange={this.setBreakTime} />
				</View>
				<View>
					<Button 
						title="Start" 
						disabled={!this.state.if_legal_time && this.state.if_counting} 
						onClick={() => this.startCountDown()}
					/>
					<Button 
						title="Pause" 
						disabled={!this.state.if_legal_time && !this.state.if_counting} 
						onClick={() => this.pauseCountDown()}
					/>
					<Button 
						title="Reset" 
						disabled={!this.state.if_legal_time} 
						onClick={() => this.resetCountDown()}
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
});
