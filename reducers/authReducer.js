const initialState = {
    loggedIn: false,
    user: null,
    JSONWebToken: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        
        default: {
            return state;
        }
    }
}

export default authReducer;