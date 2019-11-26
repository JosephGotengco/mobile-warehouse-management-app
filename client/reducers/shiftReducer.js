import { ADDING_SHIFT, SET_SHIFT_MSG } from "./../actions/types";

const initialState = {
    addingShift: false,
    shiftMsg: ""
}


const shiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDING_SHIFT:
            return {
                ...state,
                addingShift: true
            }

        case SET_SHIFT_MSG:
            return {
                ...state,
                addingShift: false,
                shiftMsg: action.payload
            }

        default: {
            return state;
        }
    }
}

export default shiftReducer;