import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
// AS is depricated but not yet compatible with expo
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const ADD_ERROR = 'ADD_ERROR';
// const SIGN_UP = 'SIGN_UP';
const SIGN_IN = 'SIGN_IN';
const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';

// We treat sign in and sign up as one single case rather than having two identical cases
const authReducer = (state, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return { ...state, errorMessage: action.payload };
        case SIGN_IN:
            return { errorMessage: '', token: action.payload };
        case CLEAR_ERROR_MESSAGE:
            return { ...ADD_ERROR, errorMessage: '' };
        default:
            return state;
    };
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: SIGN_IN, payload: token });
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
};

const signup = dispatch => async ({ email, password }) => {
    // make API request to sign up with that email and password
    try {
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: SIGN_IN, payload: response.data.token });

        // navigate to main flow
        navigate('TrackList');
    } catch (err) {
        dispatch({ type: ADD_ERROR, payload: 'Something went wrong with sign up' })

    }
    // if we sign up, modify out state, and say the we are authenticated

    // if signing up fails, we'd need to reflect an error message somewhere

};

const signin = (dispatch) => async ({ email, password }) => {
    // try to sign in
    try {
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: SIGN_IN, payload: response.data.token });

    } catch (err) {
        dispatch({ type: ADD_ERROR, payload: "Something went wrong with sign in" })
    }
    // handle success by updating state
    // handle failure by displaying error msg
    navigate('TrackList');

};


const signout = (dispatch) => () => {
    // somehow sign out!
};


// we're not logged in because we don't have a token
export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);