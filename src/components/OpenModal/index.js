import React, { useState,useEffect,useCallback } from 'react';
import styled from "styled-components";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useAPI } from '../AnnotationContext';
import API from '../../API';

const NewGroup = styled(ListGroup)`
max-height: 300px;
overflow-y: auto;
`;

const OpenModal = ({ show, setShow, setActivePageId,setShowFullLoading }) => {

    const [specList, setSpecList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const { setDispatch } = useAPI();
    const [selectedId, setSelectedId] = useState(null);

    const handleClose = () => {
        setShow(false);
    };

    const handleChoose = () => {
        fetchSpecSet(selectedId);
        setActivePageId(0);
        setShow(false);
    };

    const alertClicked = (specID) => {
        setSelectedId(specID);
    };

    const fetchSpecSet = async (specID) => {
        try {
            setShowFullLoading(true);
            await API.getSpecSet(specID)
            .then(res=>{
                if(res !== null){
                    setShowFullLoading(false);
                    setDispatch({ type: 'fetch_success', OCR_SpecSet: JSON.parse(res) })
                }else{
                    alert("error: no page data");
                    return;
                }
            },err=>alert(err))
        } catch (error) {
            alert(error);
            return;
        }
    };

    const fetchSpecList = useCallback(async () => {
        try {
            await API.getSpecList()
            .then(res=>{
                setSpecList(JSON.parse(res));
                setFilteredList(JSON.parse(res));
                setSelectedId(null);
            })
        } catch (error) {
            console.log(error);
        }
    },[]);

    useEffect(() => {
        fetchSpecList();
    }, [show,fetchSpecList])

    const filterBySearch = (event) => {
        // Access input value
        const query = event.target.value;
        // Create copy of item list
        let updatedList = [...specList];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
            return item.SpecName.includes(query);
        });
        // Trigger render with updated values
        setFilteredList(updatedList);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>開啟專案</Modal.Title>
            </Modal.Header>
            <Modal.Body className='m-0 p-0'>
                <Form.Group as={Row} className="m-3" controlId="search-box">
                    <Form.Label column sm="1">
                        <FontAwesomeIcon className="icon me-1" icon={faSearch} />
                    </Form.Label>
                    <Col sm="11">
                        <Form.Control type="text" onChange={filterBySearch} />
                    </Col>
                </Form.Group>
                <NewGroup variant="flush" className='rounded-0 overflow-y-auto'>
                    {(filteredList!==null &&filteredList!==[]) && filteredList.map((item, index) => (
                        <ListGroup.Item action onClick={()=>alertClicked(item.SpecID)} key={item.SpecID}>
                            {item.SpecName}
                        </ListGroup.Item>
                    ))}
                </NewGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    取消
                </Button>
                <Button variant="dark" onClick={handleChoose}>
                    開啟
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OpenModal;