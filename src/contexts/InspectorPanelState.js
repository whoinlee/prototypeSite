import { createContext } from 'react';


//-- Initial state
const initialState = {};

//-- Create contexts
export const InspectorPanelSmContext = createContext(initialState);
export const InspectorPanelLgContext = createContext(initialState);
export const InspectorPanelFixedContext= createContext(initialState);