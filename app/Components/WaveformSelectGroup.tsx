import * as React from 'react';
import { connect } from 'react-redux';
import { Waveform } from '../Actions/actions';
import {Defaults, WAVEFORMS} from '../Constants/Defaults';
import ToggleButton from './ToggleButton';
import { IGlobalState } from '../Constants/GlobalState';

interface IProps {
	dispatch?: Function;
	style?: any;
	waveform?: string;
	waveformChange(waveform: string): void;
}

interface IState {
	waveform: any;
}

function select(state: IGlobalState): any {
	return {
		waveform: state.Waveform.wave
	};
}

@connect(select)
class WaveformSelectGroup extends React.Component<IProps, IState> {

	constructor(props){
		super(props);
		this.onButtonClick = this.onButtonClick.bind(this)
	}

	public render(): React.ReactElement<{}> {
		return (
			<div style={this.props.style}>
				{WAVEFORMS.map((waveform: string, id: number) => {
					return (
						<ToggleButton
							id={waveform}
							isOn={waveform === this.props.waveform}
							onDown={(e) => this.onButtonClick(e, waveform)}
							key={id}
						    buttonValue={waveform} />
					);
				})}
			</div>
		);
	}

	private onButtonClick(e, waveform: string) {
		e.preventDefault();
		this.props.waveformChange(waveform);
		this.props.dispatch(Waveform(waveform));
	}
}
export default WaveformSelectGroup;
