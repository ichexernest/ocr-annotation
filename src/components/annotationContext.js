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
            FilePath: "",
            PageNum: 1,
            SpecTitleSet: [
            ],
            SpecAreaSet: [
                // {
                //     id: "",
                //     x: 0,
                //     y: 0,
                //     width: 0,
                //     height: 0,
                //     type: "",

                //     AreaID:"",
                //     TitleID: "",

                //     AreaName: "",
                //     AreaDesc: "",
                //     Title: "",
                //     TitleContent: "",
                //     UX: 0,
                //     UY: 0,
                //     LX: 0,
                //     LY: 0,
                //     WordCount: 0,
                //     IsOneLine: 0,
                //     IsEng: 0,
                //     IsAnchor:0
                // }
            ],
        }
    ]
};
const reducer = (state, action) => {
    let newState ={};
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
            state = JSON.parse(aresult);
            console.log(`REDUCER new_specInfo : ${JSON.stringify(state)}`);
            return state;

        case "update_annotations":
            //alert(`REDUCER update_annotations : ${JSON.stringify(action.newAnnotationList)}`);
            newState = Object.assign({}, state);
            console.log(`REDUCER state update_annotations : ${JSON.stringify(state.PageSet[action.activePageId])}`);
            newState.PageSet[action.activePageId].SpecTitleSet = [];
            newState.PageSet[action.activePageId].SpecAreaSet = [];
            action.newAnnotationList.forEach(item => {
                if (item.type === "area") {
                    newState.PageSet[action.activePageId].SpecAreaSet.push(item);
                }
                else if (item.type === "title") {
                    newState.PageSet[action.activePageId].SpecTitleSet.push(item);
                }
            });
            console.log(`REDUCER_END update_annotations : ${JSON.stringify(state)}`);
            return newState;

        case "add_new_annotation":
            console.log(`REDUCER add_new_annotation : ${JSON.stringify(action.newAnnotation)}`);
            newState = Object.assign({}, state);
            //console.log(`REDUCER begin add_new_annotation : ${JSON.stringify(newState)}`);
            if (action.newAnnotation.type === "area")
            newState.PageSet[action.activePageId].SpecAreaSet.push(action.newAnnotation);
            else if (action.newAnnotation.type === "title") {
                if (action.newAnnotation.IsAnchor) {
                    newState.PageSet[action.activePageId].SpecTitleSet.forEach(item => {
                        item.IsAnchor = false;
                    })
                }
                newState.PageSet[action.activePageId].SpecTitleSet.push(action.newAnnotation);
            }
            console.log(`REDUCER DONE add_new_annotation : ${JSON.stringify(state.PageSet[action.activePageId].SpecAreaSet)}`);
            return newState;

        case "add_edit_annotation":
            console.log(`REDUCER add_edit_annotation : ${JSON.stringify(action.annotation)}`);
            newState = Object.assign({}, state);
            //console.log(`REDUCER begin add_new_annotation : ${JSON.stringify(newState)}`);
            if (action.annotation.type === "area"){
                let foundIndex = newState.PageSet[action.activePageId].SpecAreaSet.findIndex(x => x.id == action.annotation.id);
                newState.PageSet[action.activePageId].SpecAreaSet[foundIndex] = action.annotation;
            }
            else if (action.annotation.type === "title") {
                if (action.annotation.IsAnchor) {
                    newState.PageSet[action.activePageId].SpecTitleSet.forEach(item => {
                        item.IsAnchor = false;
                    })
                }
                let foundIndex = newState.PageSet[action.activePageId].SpecTitleSet.findIndex(x => x.id == action.annotation.id);
                newState.PageSet[action.activePageId].SpecTitleSet[foundIndex] = action.annotation;
            }
            console.log(`REDUCER DONE add_new_annotation : ${JSON.stringify(state.PageSet[action.activePageId].SpecAreaSet)}`);
            return newState;

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



