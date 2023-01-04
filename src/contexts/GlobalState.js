import { 
    createContext, 
    // useReducer
} from 'react';
// import AppReducer from './AppReducer';


//-- Initial state
const initialState = {};

//-- Create context
export const GlobalContext = createContext(initialState);