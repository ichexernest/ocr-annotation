import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

import { useAPI } from '../annotationContext';

const OpenModal = ({ show, setShow,setActivePageId }) => {
    const { setDispatch } = useAPI();
    const [active, setActive]= useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleChoose = () => {
        fetchSpecSet();
        setActivePageId(0);
        setShow(false);
    };

    const alertClicked = () => {
        setActive(true);
    };
    
    const fetchSpecSet = async () => {
        try {
            const resData = {
                SpecID: "Test001",
                SpecName: "測試1",
                SpecDesc: "這是測試用",
                OCRModel: "OCR01EN",
                RpaAPID: "AP001",
                PageSet: [
                    {
                        FilePath: "https://picsum.photos/200/300?random=1",
                        PageNum: 1,
                        SpecTitleSet: [],
                        SpecAreaSet: [],
                    },
                    {
                        FilePath: "https://picsum.photos/200/300?random=2",
                        PageNum: 2,
                        SpecTitleSet: [
                            {
                                id: "specTitleInitId01",
                                TitleID: "specTitleId01",
                                AreaName: "specAreaName01",
                                AreaDesc: "specAreaDesc01",
                                Title: "specTitle01",
                                TitleContent: "specTitleContent01",
                                PageNum: 1,
                                x: 0,
                                y: 0,
                                width: 40,
                                height: 40,
                                type: "title",
                                UX: 0,
                                UY: 0,
                                LX: 40,
                                LY: 40,
                                WordCount: 0,
                                IsOneLine: "N",
                                IsEng: "N",
                            }
                        ],
                        SpecAreaSet: [
                            {
                                id: "specAreaInitId01",
                                AreaID: "specAreaId01",
                                AreaName: "specAreaName01",
                                AreaDesc: "specAreaDesc01",
                                Title: "specAreaTitle01",
                                TitleContent: "specAreaTitleContent01",
                                PageNum: 1,
                                x: 50,
                                y: 50,
                                width: 100,
                                height: 100,
                                type: "area",
                                UX: 50,
                                UY: 50,
                                LX: 100,
                                LY: 100,
                                WordCount: 0,
                                IsOneLine: "N",
                                IsEng: "Y",
                            }
                        ],
                    }
                ]
            };
            //TODO: fetch dataset if exist
            //console.log(`data d parsr ::${pageList.length}::: ${pageList[0].Sets}`);
            if (resData.length === 0 || resData === null) {
                alert("error: no page data");
                return;
            } else {
                //setPages({ caseNo: caseNo, createDTime: createDTime, pageList: pageList });
                setDispatch({ type: 'fetch_success', OCR_SpecSet: resData })
            }
        } catch (error) {
            alert(error);
            return;
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>開啟專案</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item action onClick={alertClicked}>
                        proj 1
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={alertClicked}>
                        proj 2
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={alertClicked}>
                        proj 3
                    </ListGroup.Item>
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