import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const ADD_ERROR = 'ADD_ERROR';

const authReducer = (state, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    };
};

const signup = dispatch => {
    return async ({ email, password }) => {
        // make API request to sign up with that email and password
        try {
            const response = await trackerApi.post('/signup', { email, password });
            console.log(response.data);
        } catch (err) {
            dispatch({ type: ADD_ERROR, payload: 'Something went wrong with sign up' })

        }
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
    { isSignedIn: false, errorMessage: '' }
);