import styled from "styled-components";
import React, { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useDBSwitch } from "./DbSwitchContext";

const Wrapper = styled.div`
max-height: 92vh;
height:92vh;
width: 100%;
overflow-y:auto;
`;

const SettingPage = () => {
    const { dbType, setSwitchDispatch} = useDBSwitch();

    const [dbSwitch, setDbSwitch] = useState(false);
    console.log("curr db"+dbType.dbType)

    useEffect(() => {
        setDbSwitch(dbType.dbType === 1?true:false)
    }, []);

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
        <Wrapper>
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
        </Wrapper>
    );
}

export default SettingPage;
