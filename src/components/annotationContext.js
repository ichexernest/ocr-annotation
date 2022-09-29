import React, { useContext, useEffect, createContext, useReducer } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//import API from '../API';
const AnnotationContext = createContext();
const initialState = {
        SpecID: "",
        SpecName: "",
        SpecDesc: "",
        OCRModel: "",
        RpaAPID: "",
        PageSet: [
            {
                FilePath: "https://t4.ftcdn.net/jpg/02/61/49/05/360_F_261490536_nJ5LSRAVZA0CK9Nvt2E1fXJVUfpiqvhT.jpg",
                PageNum: 1,
                SpecTitleSet: [
                ],
                SpecAreaSet: [
                    {
                        id: "",
                        TitleID: "",
                        AreaName: "",
                        AreaDesc: "",
                        Title: "",
                        TitleContent: "",
                        PageNum: 1,
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                        type: "",
                        UX: 0,
                        UY: 0,
                        LX: 0,
                        LY: 0,
                        WordCount: 0,
                        IsOneLine: "N",
                        IsEng: "N",
                    }
                ],
            },
            {
                FilePath: "https://t4.ftcdn.net/jpg/02/61/49/05/360_F_261490536_nJ5LSRAVZA0CK9Nvt2E1fXJVUfpiqvhT.jpg",
                PageNum: 2,
                SpecTitleSet: [
                ],
                SpecAreaSet: [
                    {
                        id: "",
                        TitleID: "",
                        AreaName: "",
                        AreaDesc: "",
                        Title: "",
                        TitleContent: "",
                        PageNum: 1,
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                        type: "",
                        UX: 0,
                        UY: 5,
                        LX: 0,
                        LY: 0,
                        WordCount: 0,
                        IsOneLine: "N",
                        IsEng: "N",
                    }
                ],
            }
        ]
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'fetch_success':
            console.log(`REDUCER fetch_success : ${JSON.stringify(action.OCR_SpecSet)}`);
            let result = JSON.stringify(action.OCR_SpecSet);
            state = JSON.parse(result)
            return state;
        case 'new_specInfo':
            console.log(`REDUCER new_specInfo : ${JSON.stringify(action.submitData)}`);
            let fileP = URL.createObjectURL(action.submitData.FormFile);
            let a = {
                SpecID: "new_SpecSet_Id01",
                SpecName: action.submitData.SpecName,
                SpecDesc: action.submitData.SpecDesc,
                OCRModel: action.submitData.OCRModel,
                RpaAPID: action.submitData.RpaAPID,
                PageSet: [
                    {
                        FilePath: fileP,
                        PageNum: 1,
                        SpecTitleSet: [],
                        SpecAreaSet: [],
                    }
                ]
            }
            let aresult = JSON.stringify(a);
            state=JSON.parse(aresult);
            console.log(`REDUCER new_specInfo : ${JSON.stringify(state)}`);
            return state;
        case "edit_annotations":
            console.log(`REDUCER edit_annotations : ${JSON.stringify(action.newAnnotationList)}`);
            let editedState = Object.assign({}, state.OCR_SpecSet);
            console.log(`REDUCER state edit_annotations : ${JSON.stringify(editedState.PageSet[action.activePageId])}`);
            editedState.PageSet[action.activePageId].SpecTitleSet = [];
            editedState.PageSet[action.activePageId].SpecAreaSet = [];
            action.newAnnotationList.forEach(item => {
                if(item.type === "area"){
                    editedState.PageSet[action.activePageId].SpecAreaSet.push(item);
                }
                else if(item.type ==="title"){
                    editedState.PageSet[action.activePageId].SpecTitleSet.push(item);
                }
            });
            console.log(`REDUCER_END edit_annotations : ${JSON.stringify(editedState)}`);
            return {
                OCR_SpecSet: editedState,
            };
            case "add_new_annotation":
                console.log(`REDUCER add_new_annotation : ${JSON.stringify(action.newAnnotation)}`);
                let newState = Object.assign({}, state.OCR_SpecSet);
                console.log(`REDUCER begin add_new_annotation : ${JSON.stringify(newState)}`);
                if(action.newAnnotation.type ==="area")
                    newState.PageSet[action.activePageId].SpecAreaSet.push(action.newAnnotation);
                else if(action.newAnnotation.type ==="title")
                    newState.PageSet[action.activePageId].SpecTitleSet.push(action.newAnnotation);
                
                console.log(`REDUCER DONE add_new_annotation : ${JSON.stringify(newState)}`);
                return{
                    OCR_SpecSet: newState,
                };
        default:
            return state;
    }
}
export const AnnotationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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

