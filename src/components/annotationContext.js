import React, { useContext, useEffect, createContext, useReducer } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//import API from '../API';
const AnnotationContext = createContext();
const initialState = {
    OCR_SpecSet: {
        SpecID: "",
        SpecName: "",
        SpecDesc: "",
        OCRModel: "",
        RpaAPID: "",
        PageSet: [
            {
                FilePath:"",
                SpecTitleSet: [
                    {
                        TitleID: "",
                        AreaName: "",
                        AreaDesc: "",
                        Title: "",
                        TitleContent: "",
                        PageNum: 0,
                        UX: 0,
                        UY: 0,
                        LX: 0,
                        LY: 0,
                        WordCount: 0,
                        IsOneLine: "",
                        IsEng: "",
                    }
                ],
                SpecAreaSet: [
                    {
                        AreaID: "",
                        AreaName: "",
                        AreaDesc: "",
                        Title: "",
                        TitleContent: "",
                        PageNum: 0,
                        UX: 0,
                        UY: 0,
                        LX: 0,
                        LY: 0,
                        WordCount: 0,
                        IsOneLine: "",
                        IsEng: "",
                    }
                ],
            }
        ]
    }
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'fetch_success':
            console.log(`REDUCER FETCH_SUCCESS : ${action.OCR_SpecSet}`);
            return {
                OCR_SpecSet: action.OCR_SpecSet,
            };
        default:
            return state;
    }
}
export const AnnotationContextProvider = ({ children }) => {
    const { SpecID } = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    //const [show, setShow]= useState(false);
    //const message = "file fetch error !!";
    useEffect(() => {
        let isNew = false;
        const back = () => {
            navigate(-1);
        };
        const fetchSpecSet = async () => {
            try {
                const resData = {};
                //TODO: fetch dataset if exist
                //console.log(`data d parsr ::${pageList.length}::: ${pageList[0].Sets}`);
                if (resData.length === 0 || resData === null) {
                    alert("error: no page data");
                    back();
                } else {
                    //setPages({ caseNo: caseNo, createDTime: createDTime, pageList: pageList });
                    dispatch({ type: 'fetch_success', OCR_SpecSet: resData })
                }
            } catch (error) {
                alert(error);
                back();
            }
        };
        if (!isNew) {
            fetchSpecSet();
        }
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

