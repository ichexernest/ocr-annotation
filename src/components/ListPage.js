import styled from "styled-components";
import React,{ useState } from "react";

import MTable from "./MTable";
import SearchBar from "./SearchBar";


import API from '../API';
const Wrapper = styled.div`
max-height: 92vh;
height:92vh;
width: 100%;
overflow-y:auto;
`;
const ControlWrapper = styled.div`
display:flex;
justify-content:space-between;
align-items: center;
width:100%;
`;

const Init = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:92vh;
`;

const ListPage = () => {
    const tranDateToString = (begin) => {
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year;

        if (begin)
            year = date.getFullYear() - 1;
        else
            year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        return year + "-" + month;
    };
    const initDate = tranDateToString(false);
    const [data, setData] = useState(null);
    const [dateRange, setDateRange] = useState(initDate);
    const fetchProcList = async (searchTerm) => {
        try {
            console.log(`here get range ${searchTerm}`)
            await API.getProcList(searchTerm)
            .then(res => {
                setData(JSON.parse(res))
                setDateRange(searchTerm)
            });
            //const result = filter(JSON.parse(data.d), e=>true);
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <Wrapper>
            <ControlWrapper className="border-bottom p-2 mb-3 bg-white">
                <SearchBar fetchProcList={fetchProcList} dateRange={dateRange}/>
            </ControlWrapper>
            {data !== null ?
                <MTable data={data} dateRange={dateRange}/> :
                <Init className='text-secondary text-center'>Welcome to OCR-result check page.<br />Select a year-month range to query project list.</Init>
            }</Wrapper>
    );
}

export default ListPage;
