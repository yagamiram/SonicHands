import { Defaults, WAVEFORMS } from '../Constants/Defaults'
import {ISlider} from '../Constants/GlobalState';
import {SLIDER_CHANGE} from '../Constants/ActionTypes';

let originalState:any = {};

// Set the original state dynamically based on Defaults.Sliders
for (let slider in Defaults.Sliders) {
	console.log(slider);
	originalState = Object.assign(
		originalState,
		{
			[slider]: Defaults.Sliders[slider].value
		}
	);
}

const DefaultSliderObject: ISlider = originalState;

export const Slider = (state = DefaultSliderObject, action): ISlider => {
	switch (action.type) {
		case SLIDER_CHANGE:
			return Object.assign({},
				state, {
					[action.sliderName]: action.value,
				});
		default:
			return state;
	}
};
