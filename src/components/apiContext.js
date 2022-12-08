import React, { useContext, useEffect, createContext, useReducer, useState, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from '../API';
import ModalCard from "./ModalCard";
const CaseContext = createContext();
const initialState = {
    ProcID: '',
    PageSet: [
        {
            PageNum: 1,
            ImageData: '',
            ResultSet: [{
                AreaID: '',
                TxDTime: '',
                RawData: '',
                ResultData: '',
                ProcStatus: 10,
                DocID: '',
                UX: 0, UY: 0, LX: 0, LY: 0, Width: 0, Height: 0,
                IsEng: true,
                IsError: false,
                NewResult: '',
            }
            ],
        }
    ]
}
const reducer = (state, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'fetch_success':
            console.log(`REDUCER FETCH_SUCCESS : ${action.OCR_PreProcResult}`);
            newState = action.OCR_PreProcResult;
            return newState;
        case 'update_results':
            console.log(`REDUCER UPDATE_RESULTS : ${action.OCR_PreProcResult}`);
            newState = action.OCR_PreProcResult;
            return newState;
        default:
            return state;
    }
}
export const CaseContextProvider = ({ children }) => {
    const { ProcID } = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [show, setShow] = useState(false);
    const message = "file fetch error !!";

    const fetchPageSet = useCallback(async () => {
        try {
            console.log(`here gets ProcID: ${ProcID}`);
            const response = await API.getResultPageSet(ProcID);
            if (response.length === 0 || response === null) {
                alert("error: no result data");
                back();
            } else if (response.PageSet[0].ResultSet.length === 0) {
                alert("error: no page set data");
                back();
            } else {
                console.log(`PassSets ${JSON.stringify(response.PageSet[0].PassSets)}`)
                dispatch({ type: 'fetch_success', OCR_PreProcResult: response })
            }
        } catch (error) {
            alert(error);
            back();
        }
    }, []);

    const back = () => {
        navigate(-1);
    };
    useEffect(() => {
        fetchPageSet();
    }, [ProcID, navigate]);

    return (
        <CaseContext.Provider value={{ pages: state, setDispatch: dispatch }}>
            <ModalCard show={show} setShow={setShow} content={message} showLoading={false}></ModalCard>
            {children}
        </CaseContext.Provider>
    );
}

export const useAPI = () => {
    const context = useContext(CaseContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}

