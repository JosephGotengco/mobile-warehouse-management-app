import { ADDING_SHIFT, SET_SHIFT_MSG, ADDED_SHIFT_SUCCESSFUL, ADDING_SHIFT_SUCCESS } from "./../actions/types";

const initialState = {
    addingShift: false,
    addingShiftStatus: true,
    deletingShift: false,
    deletingShfitStatus: true,
    shiftMsg: ""
}


const shiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDING_SHIFT:
            return {
                ...state,
                addingShift: true
            }
        

        case ADDING_SHIFT_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                shiftMsg: action.payload
            }

        default: {
            return state;
        }
    }
}

export default shiftReducer;