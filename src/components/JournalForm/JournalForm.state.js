export const INITIAL_STATE= {
	isValid: {
		title: true,
		date: true,
		text: true
	},
	values: {
		title: '',
		date: '',
		text: '',
		tag: ''
	},
	isFormReadyToSubmit: false
};

export function formReducer(state, action){
	switch (action.type){
	case 'RESET_VALID':
		return {...state, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT': {
		const titleValid = state.values.title?.trim().length;
		const textValid = state.values.text?.trim().length;
		const dateValid = state.values.date;
		return {
			...state,
			isValid: {
				title: titleValid,
				date: dateValid,
				text: textValid
			},
			isFormReadyToSubmit: titleValid && textValid && dateValid
		};
	}
	case 'CLEAR': {
		return { ...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false };
	}
	case 'SET_VALUE': {
		return { ...state, values: {...state.values, ...action.payload} };
	}
	}
}