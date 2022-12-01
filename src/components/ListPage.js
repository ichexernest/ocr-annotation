import styled from "styled-components";
import React,{ useEffect, useState, useCallback } from "react";

import MTable from "./MTable";
import SearchBar from "./SearchBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import API from '../API';
const Wrapper = styled.div`
max-height: 92vh;
height: 92vh;
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

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year;

        if (begin)
            year = date.getFullYear() - 1;
        else
            year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        return year + "-" + month + "-" + day;
    };
    const initEDate = tranDateToString(false);
    const initSDate = tranDateToString(true);
    const [data, setData] = useState(null);
    const [sDate, setSDate] = useState(initSDate);
    const [eDate, setEDate] = useState(initEDate);
    const filter = (collection, predicate) => {
        var result = [];
        var length = collection.length;

        for (var j = 0; j < length; j++) {
            if (predicate(collection[j]) === true) {
                result.push(collection[j]);
            }
        }

        return result;
    }
    // const fetchCase = useCallback(async (searchTermS, searchTermE) => {
    //     try {
    //         let szSCreateDTime = searchTermS ? searchTermS.replaceAll('-', '') : '';
    //         let szECreateDTime = searchTermE ? searchTermE.replaceAll('-', '') : '';
    //         console.log(`here get range ${szSCreateDTime} to ${szECreateDTime}`)
    //         const data = await API.getCase(szSCreateDTime, szECreateDTime);
    //         //console.log(data.d);
    //         const result = filter(JSON.parse(data.d), function (element) {
    //             //if (element.Vhno === 'Case01')
    //             return true;
    //             //return false;
    //         });
    //         console.log(result);
    //         setData(result);
    //         setSDate(searchTermS);
    //         setEDate(searchTermE);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },[]);
    const fetchCase = useCallback((searchTermS, searchTermE) => {
        let szSCreateDTime = searchTermS ? searchTermS.replaceAll('-', '') : '';
        let szECreateDTime = searchTermE ? searchTermE.replaceAll('-', '') : '';
        console.log(`heressss get range ${szSCreateDTime} to ${szECreateDTime}`)
        let data1 = [
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
            { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},];
        setData(data1);
        console.log(`heres get fake data ${data1}`)
        setSDate(searchTermS);
        setEDate(searchTermE);
    },[]);
    
    useEffect(() => {
        fetchCase(sDate, eDate);
    }, [fetchCase,sDate,eDate])
    return (
        <Wrapper>
            <ControlWrapper>
                <SearchBar fetchCase={fetchCase} sDate={sDate} eDate={eDate} initSDate={initSDate} initEDate={initEDate} />
            </ControlWrapper>
            {data !== null ?
                <MTable data={data} /> :
                <Loading><FontAwesomeIcon className="icon" icon={faSpinner} size="4x" spin /></Loading>}
        </Wrapper>
    );
}

export default ListPage;
