import React, { useContext, useEffect, createContext, useReducer } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//import API from '../API';
const AnnotationContext = createContext();
const initialState = {
    OCR_SpecSet: {
        SpecID: "S1",
        SpecName: "",
        SpecDesc: "",
        OCRModel: "",
        RpaAPID: "",
        PageSet: [
            {
                FilePath: "https://picsum.photos/200/300?random=3",
                PageNum: 1,
                SpecTitleSet: [
                    {
                        id: "specTitleInitId01",
                        TitleID: "specTitleId01",
                        AreaName: "specAreaName01",
                        AreaDesc: "specAreaDesc01",
                        Title: "specTitle01",
                        TitleContent: "specTitleContent01",
                        PageNum: 1,
                        x: 0,
                        y: 0,
                        width: 40,
                        height: 40,
                        type: "title",
                        UX: 0,
                        UY: 0,
                        LX: 40,
                        LY: 40,
                        WordCount: 0,
                        IsOneLine: "N",
                        IsEng: "N",
                    }
                ],
                SpecAreaSet: [
                    {
                        id: "specAreaInitId01",
                        AreaID: "specAreaId01",
                        AreaName: "specAreaName01",
                        AreaDesc: "specAreaDesc01",
                        Title: "specAreaTitle01",
                        TitleContent: "specAreaTitleContent01",
                        PageNum: 1,
                        x: 50,
                        y: 50,
                        width: 100,
                        height: 100,
                        type: "area",
                        UX: 50,
                        UY: 50,
                        LX: 100,
                        LY: 100,
                        WordCount: 0,
                        IsOneLine: "N",
                        IsEng: "Y",
                    }
                ],
            }
        ]
    }
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'fetch_success':
            console.log(`REDUCER fetch_success : ${JSON.stringify(action.OCR_SpecSet)}`);
            return {
                OCR_SpecSet: action.OCR_SpecSet,
            };
        case 'new_specInfo':
            console.log(`REDUCER new_specInfo : ${JSON.stringify(action.submitData)}`);
            let fileP = URL.createObjectURL(action.submitData.FormFile);
            let newSpecSet = {
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
            console.log(`REDUCER new_specInfo : ${JSON.stringify(newSpecSet)}`);
            return { OCR_SpecSet: newSpecSet };
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
                if(action.newAnnotation.type ==="area")
                    newState.PageSet[action.activePageId].SpecAreaSet.push(action.newAnnotation);
                else if(action.newAnnotation.type ==="title")
                    newState.PageSet[action.activePageId].SpecTitleSet.push(action.newAnnotation);
                return state;
        default:
            return state;
    }
}
export const AnnotationContextProvider = ({ children }) => {
    // const { SpecID } = useParams();
    //const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    //const [show, setShow]= useState(false);
    //const message = "file fetch error !!";
    useEffect(() => {
        // let isNew = false;
        // const back = () => {
        //     // navigate(-1);
        // };
        // const fetchSpecSet = async () => {
        //     try {
        //         const resData = {
        //             SpecID: "Test001",
        //             SpecName: "測試1",
        //             SpecDesc: "這是測試用",
        //             OCRModel: "OCR01EN",
        //             RpaAPID: "AP001",
        //             PageSet: [
        //                 {
        //                     FilePath: "https://picsum.photos/200/300?random=1",
        //                     PageNum: 1,
        //                     SpecTitleSet: [],
        //                     SpecAreaSet: [
        //                         {
        //                             AreaID: "testAreaId01",
        //                             AreaName: "testAreaName01",
        //                             AreaDesc: "testAreaDesc01",
        //                             Title: "testTitle01",
        //                             TitleContent: "testContent01",
        //                             PageNum: 1,
        //                             UX: 10,
        //                             UY: 10,
        //                             LX: 50,
        //                             LY: 50,
        //                             WordCount: 0,
        //                             IsOneLine: "N",
        //                             IsEng: "N",
        //                         }
        //                     ],
        //                 },
        //                 {
        //                     FilePath: "https://picsum.photos/200/300?random=2",
        //                     PageNum: 2,
        //                     SpecTitleSet: [],
        //                     SpecAreaSet: [
        //                         {
        //                             AreaID: "testAreaId02",
        //                             AreaName: "testAreaName02",
        //                             AreaDesc: "testAreaDesc02",
        //                             Title: "testTitle02",
        //                             TitleContent: "testContent02",
        //                             PageNum: 2,
        //                             UX: 10,
        //                             UY: 10,
        //                             LX: 50,
        //                             LY: 50,
        //                             WordCount: 0,
        //                             IsOneLine: "N",
        //                             IsEng: "N",
        //                         }
        //                     ],
        //                 }
        //             ]
        //         };
        //         //TODO: fetch dataset if exist
        //         //console.log(`data d parsr ::${pageList.length}::: ${pageList[0].Sets}`);
        //         if (resData.length === 0 || resData === null) {
        //             alert("error: no page data");
        //             back();
        //         } else {
        //             //setPages({ caseNo: caseNo, createDTime: createDTime, pageList: pageList });
        //             dispatch({ type: 'fetch_success', OCR_SpecSet: resData })
        //         }
        //     } catch (error) {
        //         alert(error);
        //         back();
        //     }
        // };
        // if (!isNew) {
        //     fetchSpecSet();
        // }
    }, []);
    return (
        <AnnotationContext.Provider value={{ annotation: state.OCR_SpecSet, setDispatch: dispatch }}>
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

