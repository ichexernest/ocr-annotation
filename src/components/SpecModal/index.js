import React, { useState, useCallback, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { useAPI } from '../AnnotationContext';
import API from '../../API';

const SpecModal = ({ show, setShow, setActivePageId, editSpecItem }) => {

    const { setDispatch } = useAPI();
    const [options, setOptions] = useState([])
    const [inputs, setInputs] = useState({
        OCRModel: '',
        RpaAPID: '',
        SpecName: '',
        SpecDesc: '',
        FormFile: ''
    });

    const fetchRpaAPList = useCallback(async () => {
        try {
            const data = await API.getRpaAPList();
            setOptions(JSON.parse(data));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchRpaAPList();
    }, [show])

    useEffect(() => {
        setInputs(editSpecItem !== null && editSpecItem !== undefined ? {
            OCRModel: editSpecItem.OCRModel,
            RpaAPID: editSpecItem.RpaAPID,
            SpecName: editSpecItem.SpecName,
            SpecDesc: editSpecItem.SpecDesc,
            FormFile: editSpecItem.FormFile,
        } : {
            OCRModel: '',
            RpaAPID: '',
            SpecName: '',
            SpecDesc: '',
            FormFile: ''
        })
    }, [editSpecItem]);

    const handleTextChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleUpload = (e) => {
        const name = e.target.id;
        const file = e.target.files[0];
        setInputs(values => ({ ...values, [name]: file }))
    }

    const handleClose = () => {
        setShow(false);
    };

    const handleCheck = (e) => {
        e.preventDefault();
        let submitData = inputs;
        if (submitData.OCRModel === '') {
            alert(`未填寫OCR模型`);
            return;
        }
        if (submitData.RpaAPID === '') {
            alert(`未填寫RpaAPID`);
            return;
        }
        if (submitData.SpecName === '') {
            alert(`未填寫規格名稱`);
            return;
        }
        if (submitData.SpecDesc === '') {
            alert(`未填寫規格說明`);
            return;
        }

        if (editSpecItem !== null && editSpecItem !== undefined) {
            const editedItem = { ...editSpecItem, ...submitData };
            fetchUpdateSpec(editedItem);
        } else {
            if(submitData.FormFile.type ==="application/pdf"){
            //fetchTestConvert(submitData);                        
            fetchCreateSpecSet(submitData);
            // setDispatch({
            //     type: "new_specInfo",
            //     submitData: submitData,
            // })
            }
            else if( submitData.FormFile.type==="image/png"||submitData.FormFile.type==="image/jpeg" ){
                //convert to base64
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Use a regex to remove data url part
                    const base64String = reader.result
                    console.log(base64String);
                    //fetchTestConvertImage(submitData,base64String)
                    fetchCreateSpecSet(submitData,base64String)
                };
                reader.readAsDataURL(submitData.FormFile);
                
            }else{
                alert("not supported file type");
                return;
            }
        }
        setActivePageId(0);
        setShow(false);
        setInputs({
            OCRModel: '',
            RpaAPID: '',
            SpecName: '',
            SpecDesc: '',
            FormFile: ''
        })
    }

    const fetchUpdateSpec = async (editedItem) => {
        try {
            const resData = await API.updateSpec(editedItem);
            if (resData === null) {
                alert("error: no data");
                return;
            } else {
                setDispatch({ type: 'update_specInfo', submitData: editedItem })
            }
        } catch (error) {
            alert(error);
            return;
        }
    };

    const fetchCreateSpecSet = async (submitData,base64Data) => {
        try {
            // const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
            //     API.turnPdf2Jpeg(submitData),
            //     API.createSpec(submitData,firstResponse),
            //     API.getSpecSet(secondResponse)
            // ]);
            let result = "";
            if(submitData.FormFile.type ==="application/pdf"){
                let formData = new FormData();
                formData.append("Cfile", submitData['FormFile']);
                result = await API.turnPdf2Jpeg(formData)
                .then(res => API.createSpec(submitData, res))
                .then(res => API.getSpecSet(res))
                .then(res => setDispatch({
                    type: "fetch_success",
                    OCR_SpecSet: JSON.parse(res),
                }))
            }else{
                result = await API.createSpec(submitData, base64Data.split(',')[1])
                .then(res => API.getSpecSet(res))
                .then(res => setDispatch({
                    type: "fetch_success",
                    OCR_SpecSet: JSON.parse(res),
                }))
            }
            
            if (result === null) {
                alert("error: no page data");
                return;
            }
        } catch (error) {
            alert(error);
            return;
        }
    };
    const fetchTestConvert = async (submitData) => {
        try {
            let formData = new FormData();
            formData.append("Cfile", submitData['FormFile']);
            //alert(JSON.stringify(submitData['FormFile']));
            const jpegBase64 = await API.turnPdf2Jpeg(formData);
            submitData['FormFile'] = jpegBase64;
            setDispatch({
                type: "new_specInfo",
                submitData: submitData,
            })
            return;

        } catch (error) {
            alert(error);
        }
    };
    const fetchTestConvertImage = async (submitData, base64Data) => {
        try {
            submitData['FormFile'] = base64Data;
            setDispatch({
                type: "new_specInfo",
                submitData: submitData,
            })
            return;

        } catch (error) {
            alert(error);
        }
    };



    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editSpecItem !== null && editSpecItem !== undefined ? "修改專案內容" : "新增專案"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleCheck}>
                <Modal.Body>
                    <FloatingLabel
                        controlId="OCRModel"
                        label="OCR模型*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type OCRModel" defaultValue={editSpecItem !== null && editSpecItem !== undefined ? editSpecItem.OCRModel : ""} />
                    </FloatingLabel>
                    <FloatingLabel controlId="RpaAPID" label="RpaAPID*" className="mb-3" onChange={handleTextChange}>
                        <Form.Select aria-label="Floating label select example" defaultValue={editSpecItem !== null && editSpecItem !== undefined ? editSpecItem.RpaAPID : ""}>
                            <option disabled hidden value="">請選擇...</option>
                            {options !== [] && options.map((item, index) => (
                                <option key={item.RpaAPID} value={item.RpaAPID}>{item.RpaAPName}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="SpecName"
                        label="規格名稱*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type SpecName" defaultValue={editSpecItem !== null && editSpecItem !== undefined ? editSpecItem.SpecName : ""} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="SpecDesc"
                        label="規格說明*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type SpecDesc" defaultValue={editSpecItem !== null && editSpecItem !== undefined ? editSpecItem.SpecDesc : ""} />
                    </FloatingLabel>
                    {editSpecItem === null &&
                        <>
                            <hr />
                            <Form.Label>選擇檔案</Form.Label>
                            <Form.Control className='mb-3' type="file" id="FormFile" onChange={handleUpload} />
                        </>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="dark" type="submit">
                        {editSpecItem !== null && editSpecItem !== undefined ? "更新" : "新建"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default SpecModal;