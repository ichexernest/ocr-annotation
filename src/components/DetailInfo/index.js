import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { ContentList,EditNav } from './DetailInfo.styles';
import { useAPI } from "../apiContext";
import API from '../../API';
import ResultModal from '../ResultModal';
const DetailInfo = ({ targetIndex, pageIndex }) => {
    const { pages } = useAPI();
    const [show, setShow] = useState(false);
    const handleEdit = () => {
        setShow(true);
    };
    const result =pages.PageSet[pageIndex].ResultSet[targetIndex];

    return (
        <ContentList className="bg-white d-flex flex-column align-items-stretch ustify-content-between">
            <EditNav className="px-2 border-bottom mb-2 d-flex justify-content-start align-items-center bg-white">
                <span>{result.AreaName}-{result.AreaID}</span>
                <Button variant="light" className='m-2 rounded-circle btn-sm' onClick={() => handleEdit()}>
                <FontAwesomeIcon className="icon" icon={faPen} />
            </Button>
            </EditNav>
            <div className="p-2">
            <div className="mb-2 d-flex justify-content-between p-2 bg-light rounded border">
                <span><strong>辨識狀態:</strong>{result.ProcStatus}</span>
                <span><strong>英數字:</strong>{result.IsEng ? "y" : "n"}</span>
                <span><strong>辨識錯誤:</strong>{result.ProcStatus>20 ? "y" : "n"}</span>
            </div>
            <strong>辨識結果:</strong><div className="border bg-light rounded p-2 mb-2">{result.ResultData}</div>
            <strong>修正結果:</strong><div className="border bg-light rounded p-2 mb-2">{result.NewResult}</div>
            </div>
            <ResultModal
                show={show}
                setShow={setShow}
                activeTarget={pages.PageSet[pageIndex].ResultSet[targetIndex]}
                activePageIndex={pageIndex}
            />
        </ContentList>
    )
};
export default DetailInfo;