import React, { useState } from "react";
//import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SearchBar = ({ fetchProcList, dateRange, sDate, eDate }) => {
    const [inputSDate, setInputSDate] = useState(sDate);
    const [inputEDate, setInputEDate] = useState(eDate);
    const [inputDate, setInputDate] = useState(dateRange);
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



    return (
        <div className="d-flex justify-content-start align-items-center">
            <Form.Control
                type='month'
                placeholder={`Start Date`}
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
            />
            <Button className="mx-2 text-nowrap btn-dark" onClick={handleClickEvent}>搜尋</Button>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
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
        </div>
    )
}

// SearchBar.propTypes = {
//     callback: PropTypes.func
// }

export default SearchBar;
