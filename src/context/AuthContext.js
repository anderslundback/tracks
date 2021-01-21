import createDataContext from './createDataContext';

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    };
};

const signup = (dispatch) => {
    return ({ email, password }) => {
        // make API request to sign up with that email and password

        // if we sign up, modify out state, and say the we are authenticated

        // if signing up fails, we'd need to reflect an error message somewhere

    };
};

const signin = (dispatch) => {
    return ({ email, password }) => {
        // try to sign in
        // handle success by updating state
        // handle failure by displaying error msg
    };
};

const signout = (dispatch) => {
    return () => {
        // somehow sign out!
    };
};



export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup },
    { isSignedIn: false }
);