import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
// AS is depricated but not yet compatible with expo
import { AsyncStorage } from 'react-native';

const ADD_ERROR = 'ADD_ERROR';
const SIGN_UP = 'SIGN_UP';

const authReducer = (state, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return { ...state, errorMessage: action.payload };
        case SIGN_UP:
            return { errorMessage: '', token: action.payload };
        default:
            return state;
    };
};

const signup = dispatch => async ({ email, password }) => {
    // make API request to sign up with that email and password
    try {
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: SIGN_UP, payload: response.data.token });

    } catch (err) {
        dispatch({ type: ADD_ERROR, payload: 'Something went wrong with sign up' })

    }
    // if we sign up, modify out state, and say the we are authenticated

    // if signing up fails, we'd need to reflect an error message somewhere

};

const signin = (dispatch) => ({ email, password }) => {
    // try to sign in
    // handle success by updating state
    // handle failure by displaying error msg
};


const signout = (dispatch) => () => {
    // somehow sign out!
};


// we're not logged in because we don't have a token
export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup },
    { token: null, errorMessage: '' }
);