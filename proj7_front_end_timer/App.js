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
			<div>
				<input type="text" onChange={event => this.handleHourInput(event, "hour")} style={{color: this.state.color.hour}} /> : 
				<input type="text" onChange={event => this.handleHourInput(event, "minute")} style={{color: this.state.color.hour}} /> :
				<input type="text" onChange={event => this.handleHourInput(event, "second")} style={{color: this.state.color.hour}} />
			</div>
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
	}

	setTime(time, type) {
		if (typeof time !== "string") {
			this.state = {
				...this.state,
				[type]: time,
				curr_time: time.hour * 3600 + time.minute * 60 + time.second,
				if_legal_time: true,
			}
		} else {
			this.state = {
				...this.state,
				if_legal_time: false
			}
		}
	}

	setWorkTime(time) {
		this.setTime(time, "work_time")
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

	}

	render() {
		return (
			<View style={styles.container}>
				<div>
					<Timer />
				</div>
				<div>
					<Text>Work:</Text>
					<TimeField onTimeChange={this.setWorkTime} />
				</div>
				<div>
					<Text>Break: </Text>
					<TimeField onTimeChange={this.setBreakTime} />
				</div>
				<div>
					<button disabled={!this.state.if_legal_time && this.state.if_counting} onClick={() => this.startCountDown()}>
						Start
					</button>
					<button disabled={!this.state.if_legal_time && !this.state.if_counting} onClick={() => this.pauseCountDown()}>
						Pause
					</button>
					<button disabled={!this.state.if_legal_time} onClick={() => this.resetCountDown()}>
						Reset
					</button>
				</div>
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
