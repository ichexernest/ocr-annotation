import React, { useState, useEffect } from "react";
//import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDBSwitch } from "../DbSwitchContext";


const SearchBar = ({ fetchProcList, fetchProcListR, dateRange, sDate, eDate }) => {
    const [inputSDate, setInputSDate] = useState(sDate);
    const [inputEDate, setInputEDate] = useState(eDate);
    const [inputDate, setInputDate] = useState(dateRange);
    const [show, setShow] = useState(false);
    const [timeQuerySwitch, setTimeQuerySwitch] = useState(true);

    const { dbType, setSwitchDispatch } = useDBSwitch();

    const [dbSwitch, setDbSwitch] = useState(false);

    useEffect(() => {
        setDbSwitch(dbType.dbType === 1 ? true : false)
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
        fetchProcListR(inputSDate, inputEDate);
    };

    const handleSwitch = (event) => {
        let name, value;
        name = event.target.id;
        value = event.target.checked;
        setDbSwitch(value)
    }
    const handleQuerySwitch = () => {
        setTimeQuerySwitch(!timeQuerySwitch);
    }
    const save = () => {
        setSwitchDispatch({ type: 'switch_type', switch: dbSwitch })
    }




    return (
        <div className="d-flex justify-content-start align-items-center">
            {timeQuerySwitch ?
                <>
                    <Form.Control
                        type='month'
                        placeholder={`Start Date`}
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                    />
                    <Button className="mx-2 text-nowrap btn-dark" onClick={handleClickEvent}>搜尋</Button>
                </>
                :
                <>
                    <Form.Control
                        type='date'
                        placeholder={`Start Date`}
                        value={inputSDate}
                        onChange={(e) => setInputSDate(e.target.value)}
                    />
                    <span className="mx-2">to</span>
                    <Form.Control
                        type='date'
                        placeholder={`End Date`}
                        value={inputEDate}
                        onChange={(e) => setInputEDate(e.target.value)}
                    />
                    <Button className="mx-2 text-nowrap btn-dark" onClick={handleClickEventR}>搜尋</Button>
                </>
            }
            <Button className="mx-2 text-nowrap btn-light" onClick={handleQuerySwitch}>{timeQuerySwitch ? "月份查詢" : "日期查詢"}</Button>
            {/* 
            <Button className="mx-2 text-nowrap btn-warning" onClick={handleShow}>
                setting
            </Button> */}
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>dev environment test setting </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="m-3">
                        <span>目前結果查詢連線db: {dbType.dbType === 1 ? "OCRStore" : "workflow"}</span>
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
