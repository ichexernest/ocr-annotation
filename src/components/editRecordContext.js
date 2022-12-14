import React, { useContext, createContext, useReducer } from "react";
//import API from '../API';
const RecordContext = createContext();
const initialState = {
    ResultRecord: [
    ],
};
const reducer = (state, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'update_record':
            console.log(`REDUCER update_record : ${JSON.stringify(action.submitData)}`);
            let foundIndex = newState.ResultRecord.findIndex(x => x.AreaID === action.submitData.AreaID);
            if (foundIndex === -1) {
                newState.ResultRecord.push(action.submitData);
            } else {
                newState.ResultRecord[foundIndex] = action.submitData;
            }
            console.log(`REDUCER update_record : ${JSON.stringify(newState)}`);
            return newState;
        case 'reset_record':
            console.log(`REDUCER reset_record `);
            newState={
                ResultRecord: [
                ],
            };
            return newState;
        default:
            return state;
    }
}
export const RecordContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <RecordContext.Provider value={{ record: state, setRecordDispatch: dispatch }}>
            {children}
        </RecordContext.Provider>
    );
}

export const useRecord = () => {
    const context = useContext(RecordContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}



