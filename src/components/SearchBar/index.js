import React, { useState } from "react";
//import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ fetchCase, sDate, eDate, initSDate, initEDate}) => {

    const [inputSDate, setInputSDate] = useState(sDate);
    const [inputEDate, setInputEDate] = useState(eDate);
    const handleClickEvent = () => {
        if (inputSDate > inputEDate || inputSDate === inputEDate) {
            alert(`wrong range!!!!try again!!!!${inputSDate} to ${inputEDate}`);
            return;
        }
        console.log(`search date range ${inputSDate} to ${inputEDate}.`);
        fetchCase(inputSDate, inputEDate);
    };
    const handleRefreshEvent = () => {
        console.log(`${initSDate} --------------${initEDate}`)
        setInputSDate(initSDate)
        setInputEDate(initEDate)
        fetchCase(initSDate,initEDate);
    };

    return (
        <div className="d-flex justify-content-end align-items-center my-3">
                <Form.Control
                    type='date'
                    placeholder={`Start Date`}
                    value={inputSDate}
                    onChange={(e) => setInputSDate(e.target.value)}
                />
            <span className="mx-2">至</span>
                <Form.Control
                    type='date'
                    placeholder={`End Date`}
                    value={inputEDate}
                    onChange={(e) => setInputEDate(e.target.value)}
                />
            <Button className="mx-1 text-nowrap btn-dark" onClick={handleClickEvent}>搜尋</Button>
            <Button className="mx-1 btn-dark" onClick={handleRefreshEvent}><FontAwesomeIcon className="icon" icon={faSync} /></Button>
        </div>
    )
}

// SearchBar.propTypes = {
//     callback: PropTypes.func
// }

export default SearchBar;
