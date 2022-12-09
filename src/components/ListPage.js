import styled from "styled-components";
import React,{ useEffect, useState, useCallback } from "react";

import MTable from "./MTable";
import SearchBar from "./SearchBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import API from '../API';
const Wrapper = styled.div`
max-height: 100vh;
height: 100vh;
width: 100vw;
overflow-y:auto;
`;
const ControlWrapper = styled.div`
display:flex;
justify-content:space-between;
align-items: center;
padding: 0 12px;
`;
const Loading = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items: center;
color:var(--primary);
`;
const ListPage = () => {
    const tranDateToString = (begin) => {
        let date = new Date();

        let month = date.getMonth() + 1;
        let year;

        if (begin)
            year = date.getFullYear() - 1;
        else
            year = date.getFullYear();
        if (month < 10) month = "0" + month;


        return year + "-" + month;
    };
    const initEDate = tranDateToString(false);
    const initSDate = tranDateToString(true);
    const [data, setData] = useState(null);
    const [sDate, setSDate] = useState(initSDate);
    const [eDate, setEDate] = useState(initEDate);
    // const filter = (collection, predicate) => {
    //     var result = [];
    //     var length = collection.length;

    //     for (var j = 0; j < length; j++) {
    //         if (predicate(collection[j]) === true) {
    //             result.push(collection[j]);
    //         }
    //     }

    //     return result;
    // }
    const fetchProcList = useCallback(async (searchTermS, searchTermE) => {
        try {
            let szSCreateDTime = searchTermS ? searchTermS.replaceAll('-', '') : '';
            let szECreateDTime = searchTermE ? searchTermE.replaceAll('-', '') : '';
            console.log(`here get range ${szSCreateDTime} to ${szECreateDTime}`)
            const data = await API.getProc(szSCreateDTime, szECreateDTime);
            //const result = filter(JSON.parse(data.d), e=>true);
            console.log(data);
            setData(data);
            setSDate(searchTermS);
            setEDate(searchTermE);
        } catch (error) {
            console.log(error);
        }
    },[]);
    
    useEffect(() => {
        fetchProcList(sDate, eDate);
    }, [fetchProcList,sDate,eDate])
    return (
        <Wrapper>
            <ControlWrapper>
                <SearchBar fetchProcList={fetchProcList} sDate={sDate} eDate={eDate} initSDate={initSDate} initEDate={initEDate} />
            </ControlWrapper>
            {data !== null ?
                <MTable data={data} /> :
                <Loading><FontAwesomeIcon className="icon" icon={faSpinner} size="4x" spin /></Loading>}
        </Wrapper>
    );
}

export default ListPage;
