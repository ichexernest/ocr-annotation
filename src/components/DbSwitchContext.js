import React, { useContext, createContext, useReducer } from "react";
//import API from '../API';
const SwitchContext = createContext();
const initialState = {
    dbType: 0
};
const reducer = (state, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'switch_type':
            console.log(`REDUCER switch_type : ${JSON.stringify(action.switch)}`);
            if (action.switch) newState.dbType = 1; //ocrstore
            else newState.dbType = 0; //workflow
            return newState;
        default:
            return state;
    }
}
export const SwitchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SwitchContext.Provider value={{ dbType: state, setSwitchDispatch: dispatch }}>
            {children}
        </SwitchContext.Provider>
    );
}

export const useDBSwitch = () => {
    const context = useContext(SwitchContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}



