import { createContext } from 'react';


//-- Initial state
const initialState = {};

//-- Create contexts
export const SkeletonRelationshipContext = createContext(initialState);
export const SkeletonServicesContext = createContext(initialState);
export const SkeletonPodsContext = createContext(initialState);