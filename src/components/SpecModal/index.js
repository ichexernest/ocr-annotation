import React, { useState, useCallback, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { useAPI } from '../AnnotationContext';
import API from '../../API';

const SpecModal = ({ show, setShow, setActivePageId, editSpecItem,setShowFullLoading }) => {

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
            await API.getRpaAPList()
            .then(res=>setOptions(JSON.parse(res)))
        } catch (error) {
            alert(error);
            return;
        }
    }, []);

    useEffect(() => {
        fetchRpaAPList();
    }, [show,fetchRpaAPList])

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
            alert(`?????????OCR??????`);
            return;
        }
        if (submitData.RpaAPID === '') {
            alert(`?????????RpaAPID`);
            return;
        }
        if (submitData.SpecName === '') {
            alert(`?????????????????????`);
            return;
        }
        if (submitData.SpecDesc === '') {
            alert(`?????????????????????`);
            return;
        }

        if (editSpecItem !== null && editSpecItem !== undefined) {
            const editedItem = { ...editSpecItem, ...submitData };
            fetchUpdateSpec(editedItem);
        } else {
            if(submitData.FormFile.type ==="application/pdf"){                     
            fetchCreateSpecSet(submitData);
            }
            else if( submitData.FormFile.type==="image/png"||submitData.FormFile.type==="image/jpeg" ){
                //convert to base64
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Use a regex to remove data url part
                    const base64String = reader.result.split(',')[1];
                    console.log(base64String);
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
            setShowFullLoading(true)
            await API.updateSpec(editedItem)
                .then(res=>setDispatch({ type: 'update_specInfo', submitData: editedItem }))
            setShowFullLoading(false)
        } catch (error) {
            alert(error);
            return;
        }
    };
    const fetchCreateSpecSet = async (submitData,base64Data) => {
        try {
            setShowFullLoading(true)
            if(submitData.FormFile.type ==="application/pdf"){
                let formData = new FormData();
                formData.append("Cfile", submitData['FormFile']);
                await API.turnPdf2Jpeg(formData)
                .then(res => API.createSpec(submitData, res))
                .then(res => API.getSpecSet(res))
                .then(res => setDispatch({
                    type: "fetch_success",
                    OCR_SpecSet: JSON.parse(res),
                }))
            }else{
                await API.createSpec(submitData, base64Data)
                .then(res => API.getSpecSet(res))
                .then(res => setDispatch({
                    type: "fetch_success",
                    OCR_SpecSet: JSON.parse(res),
                }))
            }
            setShowFullLoading(false)
        } catch (error) {
            console.log(`GGGGGGGGGGGG`+error);
            return;
        }
    };

    return (<>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editSpecItem !== null && editSpecItem !== undefined ? "??????????????????" : "????????????"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleCheck}>
                <Modal.Body>
                    <FloatingLabel
                        controlId="OCRModel"
                        label="OCR??????*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type OCRModel" defaultValue={editSpecItem !== null && editSpecItem !== undefined ? editSpecItem.OCRModel : ""} disabled={editSpecItem !== null && editSpecItem !== undefined ? true:false}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="RpaAPID" label="RpaAPID*" className="mb-3" onChange={handleTextChange}>
                        <Form.Select aria-label="Floating label select example" defaultValue={editSpecItem !== null && editSpecItem !== undefined ? editSpecItem.RpaAPID : ""} disabled={editSpecItem !== null && editSpecItem !== undefined ? true:false}>
                            <option disabled hidden value="">?????????...</option>
                            {options !== [] && options.map((item, index) => (
                                <option key={item.RpaAPID} value={item.RpaAPID}>{item.RpaAPName}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                    
                    <FloatingLabel
                        controlId="SpecName"
                        label="????????????*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type SpecName" defaultValue={editSpecItem !== null && editSpecItem !== undefined ? editSpecItem.SpecName : ""} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="SpecDesc"
                        label="????????????*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type SpecDesc" defaultValue={editSpecItem !== null && editSpecItem !== undefined ? editSpecItem.SpecDesc : ""} />
                    </FloatingLabel>
                    {editSpecItem === null &&
                        <>
                            <hr />
                            <Form.Label>????????????</Form.Label>
                            <Form.Control className='mb-3' type="file" id="FormFile" onChange={handleUpload} />
                        </>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        ??????
                    </Button>
                    <Button variant="dark" type="submit">
                        {editSpecItem !== null && editSpecItem !== undefined ? "??????" : "??????"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
}

export default SpecModal;