import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Timer = props => (
	<div>
		
	</div>
)

const WorkTime = props => (
	<div>
		<Text>Work: </Text>
		<input type="text"></input>
	</div>
)

const BreakTime = props => (
	<div>
		<Text>Break: </Text>
		<input type="text"></input>
	</div>
)

export default class App extends React.Component {
	constructor() {
		super()
		this.state = {
			work_time: 0,
			break_time: 0,
			curr_time: {
				minute: 0,
				second: 0,
			},
		}
	}

	setTime() {

	}

	startCountDown() {

	}

	pauseCountDown() {

	}

	resetCountDown() {

	}

	ring() {

	}

	render() {
		return (
			<View style={styles.container}>
				<Timer />
				<WorkTime />
				<BreakTime />
				<div>
					<button onClick>Set</button>
					<button>Start</button>
					<button>Pause</button>
					<button>Reset</button>
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
