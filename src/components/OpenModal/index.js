import React, { useState,useEffect,useCallback } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useAPI } from '../annotationContext';
import API from '../../API';

const OpenModal = ({ show, setShow, setActivePageId }) => {

    const [specList, setSpecList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const { setDispatch } = useAPI();
    const [active, setActive] = useState(false);
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
        setActive(true);
        setSelectedId(specID);
    };

    const fetchSpecSet = async (specID) => {
        try {
            const resData = await API.getSpecSet(specID);
            console.log(resData);
            if (resData === null) {
                alert("error: no page data");
                return;
            } else {
                setDispatch({ type: 'fetch_success', OCR_SpecSet: resData })
            }
        } catch (error) {
            alert(error);
            return;
        }
    };

    const fetchSpecList = useCallback(async () => {
        try {
            const data = await API.getSpecList();
            console.log(data);
            setSpecList(data);
            setFilteredList(data);
            setSelectedId(null);
        } catch (error) {
            console.log(error);
        }
    },[]);

    useEffect(() => {
        fetchSpecList();
    }, [fetchSpecList])

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
                <ListGroup variant="flush" className='rounded-0'>
                    {filteredList!==[] && filteredList.map((item, index) => (
                        <ListGroup.Item action onClick={()=>alertClicked(item.SpecID)} key={item.SpecID}>
                            {item.SpecName}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    取消
                </Button>
                <Button variant="primary" onClick={handleChoose}>
                    開啟
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OpenModal;