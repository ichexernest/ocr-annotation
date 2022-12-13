import React, { useState } from "react";
//import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const SearchBar = ({ fetchProcList, dateRange}) => {

    const [inputDate, setInputDate] = useState(dateRange);
    const handleClickEvent = () => {
        if(inputDate==="" ||inputDate===null){
            alert(`請輸入時間範圍`);
            return;
        }
        fetchProcList(inputDate);
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
        </div>
    )
}

// SearchBar.propTypes = {
//     callback: PropTypes.func
// }

export default SearchBar;
