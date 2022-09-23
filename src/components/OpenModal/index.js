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
                        SpecAreaSet: [
                            {
                                AreaID: "testAreaId01",
                                AreaName: "testAreaName01",
                                AreaDesc: "testAreaDesc01",
                                Title: "testTitle01",
                                TitleContent: "testContent01",
                                PageNum: 1,
                                UX: 10,
                                UY: 10,
                                LX: 50,
                                LY: 50,
                                WordCount: 0,
                                IsOneLine: "N",
                                IsEng: "N",
                            }
                        ],
                    },
                    {
                        FilePath: "https://picsum.photos/200/300?random=2",
                        PageNum: 2,
                        SpecTitleSet: [],
                        SpecAreaSet: [
                            {
                                AreaID: "testAreaId02",
                                AreaName: "testAreaName02",
                                AreaDesc: "testAreaDesc02",
                                Title: "testTitle02",
                                TitleContent: "testContent02",
                                PageNum: 2,
                                UX: 10,
                                UY: 10,
                                LX: 50,
                                LY: 50,
                                WordCount: 0,
                                IsOneLine: "N",
                                IsEng: "N",
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
                        Link 1
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={alertClicked}>
                        Link 2
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={alertClicked}>
                        This one is a button
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    取消
                </Button>
                <Button variant="primary" onClick={handleChoose}>
                    儲存
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OpenModal;