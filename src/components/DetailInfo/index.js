import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';


import { Wrapper, Info,ContentList} from './DetailInfo.styles';
import { useAPI } from "../apiContext";
import API from '../../API';
const DetailInfo = ({ targetIndex, pageIndex }) => {
    const [disabled, setDisabled] = useState(true); //check button disabled
    const { pages, setDispatch } = useAPI();
    const handleCheck = (i) => {
        console.log(i);
        //post Change
        const modifiedBoxPass = async (caseNo,createDTime,page,boxIndex) => {
            try {
                const iCount = await API.modifiedBoxPass(caseNo, createDTime, page, boxIndex);
                console.log(iCount);
            } catch (error) {
                alert(error);
            }
        };
        modifiedBoxPass(pages.caseNo,pages.createDTime,pageIndex,i).then(()=>{
            setDispatch({
                type: "pass_check",
                pageNum: pageIndex,
                boxIndex: i
            })
        })
    }
    useEffect(() => {
        setDisabled(
            pages.pageList[pageIndex].Sets[targetIndex].Pass
            || pages.pageList[pageIndex].Sets[targetIndex].OcrSSIM === 1 ? true : false);
    }, [pages.pageList, pageIndex, targetIndex])

    return (
        <div className="d-flex flex-column">
            <ContentList>
                <strong>辨識結果:</strong>{pages.pageList[pageIndex].Sets[targetIndex].SrcText}<br />   
                <strong>辨識狀態:</strong>{pages.pageList[pageIndex].Sets[targetIndex].SrcText}<br />  
                <strong>更正:</strong>{pages.pageList[pageIndex].Sets[targetIndex].SrcText}<br />    
                <Button className='mx-1 btn-dark' disabled={disabled} onClick={() => handleCheck(pages.pageList[pageIndex].Sets[targetIndex].BoxIndex)}>標註為相符</Button>
            </ContentList>
        </div>
    )
};
export default DetailInfo;