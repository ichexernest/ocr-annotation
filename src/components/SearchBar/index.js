import React, { useState,useEffect } from "react";
//import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDBSwitch } from "../DbSwitchContext";


const SearchBar = ({ fetchProcList, dateRange, sDate, eDate }) => {
    const [inputSDate, setInputSDate] = useState(sDate);
    const [inputEDate, setInputEDate] = useState(eDate);
    const [inputDate, setInputDate] = useState(dateRange);
    const [show, setShow] = useState(false);

    const { dbType, setSwitchDispatch} = useDBSwitch();

    const [dbSwitch, setDbSwitch] = useState(false);
    console.log("curr db"+dbType.dbType)

    useEffect(() => {
        setDbSwitch(dbType.dbType === 1?true:false)
    }, []);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClickEvent = () => {
        if (inputDate === "" || inputDate === null) {
            alert(`請輸入時間範圍`);
            return;
        }
        fetchProcList(inputDate);
    };

    const handleClickEventR = () => {
        if (inputSDate > inputEDate || inputSDate === inputEDate) {
            alert(`wrong range!!!!try again!!!!${inputSDate} to ${inputEDate}`);
            return;
        }
        console.log(`search date range ${inputSDate} to ${inputEDate}.`);
        //fetchProcList(inputSDate, inputEDate);
    };

    const handleSwitch = (event) => {
        let name, value;
        name = event.target.id;
        value = event.target.checked;
        setDbSwitch(value)
    }
    const save = ()=>{
        setSwitchDispatch({ type: 'switch_type', switch:dbSwitch})
    }




    return (
        <div className="d-flex justify-content-start align-items-center">
            <Form.Control
                type='month'
                placeholder={`Start Date`}
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
            />
            <Button className="mx-2 text-nowrap btn-dark" onClick={handleClickEvent}>搜尋</Button>
            <Button className="mx-2 text-nowrap btn-dark" onClick={handleShow}>
                setting
            </Button>
            {/* <Form.Control
                    type='date'
                    placeholder={`Start Date`}
                    value={inputSDate}
                    onChange={(e) => setInputSDate(e.target.value)}
                />
                                <Form.Control
                    type='date'
                    placeholder={`End Date`}
                    value={inputEDate}
                    onChange={(e) => setInputEDate(e.target.value)}
                />
                            <Button onClick={handleClickEventR}>搜尋</Button> */}
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="m-3">
                        <h3> dev environment test setting </h3>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Result query switch to OCRStore"
                            onChange={handleSwitch}
                            defaultChecked={dbSwitch}
                        />
                        <Button onClick={save}>save</Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

// SearchBar.propTypes = {
//     callback: PropTypes.func
// }

export default SearchBar;
