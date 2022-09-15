import React, { useContext, useEffect, createContext, useReducer, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//import API from '../API';
import { v1 as uuidv1 } from "uuid";
const AnnotationContext = createContext();
const initialState = {
    annotations:[]
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'fetch_success':
            console.log(`REDUCER FETCH_SUCCESS : ${action.annotationList}`);
            return {
                annotationList: action.annotationList,
            };
        default:
            return state;
    }
}
export const AnnotationContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [show, setShow]= useState(false);
    const message = "file fetch error !!";
    useEffect(() => {
        const fetchAnnoInfo = async () => {
            try {
                const resData =  [
                    {
                        x: 150,
                        y: 150,
                        width: 100,
                        height: 100,
                        ux: 150,
                        uy: 150,
                        lx: 250,
                        ly: 250,
                        name: "title",
                        id: uuidv1()
                    }
                ]
                //console.log(`data d parsr ::${pageList.length}::: ${pageList[0].Sets}`);
                if (resData.length === 0 || resData === null) {
                    alert("error: no page data");
                    back();
                } else {
                    //setPages({ caseNo: caseNo, createDTime: createDTime, pageList: pageList });
                    dispatch({ type: 'fetch_success', annotationList: resData })
                }
            } catch (error) {
                alert(error);
                back();
            }
        };
        const back = () => {
            navigate(-1);
        };

        fetchAnnoInfo();
    }, [navigate]);
    return (
        <AnnotationContext.Provider value={{ annotation: state, setDispatch: dispatch }}>
            {children}
        </AnnotationContext.Provider>
    );
}

export const useAPI = () => {
    const context = useContext(AnnotationContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}

