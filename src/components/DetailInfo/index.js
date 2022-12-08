import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';

import { ContentList, TextView } from './DetailInfo.styles';
import { useAPI } from "../apiContext";
import API from '../../API';
import ResultModal from '../ResultModal';
const DetailInfo = ({ targetIndex, pageIndex }) => {
    const { pages, setDispatch } = useAPI();
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState(
        {
            NewResult: '',
            IsEng: false,
            IsError: false,
        }
    );
    const handleEdit = () => {
        setShow(true);
    };

    useEffect(() => {
        setInputs({
            NewResult: pages.PageSet[pageIndex].ResultSet[targetIndex].NewResult,
            IsEng: pages.PageSet[pageIndex].ResultSet[targetIndex].IsEng,
            IsError: pages.PageSet[pageIndex].ResultSet[targetIndex].IsError,
        })
    }, [targetIndex, pageIndex]);

    const handleTextChange = (event) => {
        let name, value;
        name = event.target.id;
        if (event.target.type === "checkbox") {
            value = event.target.checked;
        } else {
            value = event.target.value;
        }
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <ContentList className="p-2 bg-white d-flex flex-column align-items-stretch justify-content-between">
            <div className="mb-2 d-flex justify-content-between p-2 bg-light rounded border">
                <span><strong>辨識狀態:</strong>{pages.PageSet[pageIndex].ResultSet[targetIndex].ProcStatus}</span>
                <span><strong>英數字:</strong>{pages.PageSet[pageIndex].ResultSet[targetIndex].IsEng ? "y" : "n"}</span>
                <span><strong>辨識錯誤:</strong>{pages.PageSet[pageIndex].ResultSet[targetIndex].IsError ? "y" : "n"}</span>
            </div>
            <strong>辨識結果:</strong><div className="border bg-light rounded p-2 mb-2">{pages.PageSet[pageIndex].ResultSet[targetIndex].ResultData}</div>
            <strong>修正結果:</strong><div className="border bg-light rounded p-2 mb-2">{pages.PageSet[pageIndex].ResultSet[targetIndex].NewResult}</div>
            <Button variant="dark" className='my-2 px-5' onClick={() => handleEdit()}>
                編輯
            </Button>
            <ResultModal
                show={show}
                setShow={setShow}
                activeTarget={pages.PageSet[pageIndex].ResultSet[targetIndex]}
            />
        </ContentList>
    )
};
export default DetailInfo;