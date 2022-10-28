import React, { useState, useEffect } from 'react';

import { Stage, Layer } from 'react-konva';
import { PanZoom } from 'react-easy-panzoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor } from '@fortawesome/free-solid-svg-icons'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';

import ImageFromUrl from "../ImageFormUrl";
import Annotation from "../Annotation";
import AnnoInfoModal from '../AnnoInfoModal';
import { useAPI } from "../AnnotationContext";

import { WorkArea } from './MainCanvas.styles';

const MainCanvas = ({ activePageId, annoSwitch }) => {

    const { setDispatch, annotation } = useAPI();
    const annoList = annotation.PageSet[activePageId].SpecAreaSet.concat(annotation.PageSet[activePageId].SpecTitleSet);

    useEffect(() => {
        //annoList=annotation.PageSet[activePageId].SpecAreaSet.concat(annotation.PageSet[activePageId].SpecTitleSet);
    }, [activePageId,annoSwitch]);

    const [selectedId, selectAnnotation] = useState(null);
    const [canvasMeasures, setCanvasMeasures] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [show, setShow] = useState(false);
    const [newAnnotation, setNewAnnotation] = useState([]);
    const zoomRef = React.useRef();
    const [editItem, setEditItem] = useState({});
    const annotationsToDraw = [...annoList, ...newAnnotation];

    const preventPan = (e, x, y) => {   
             // if the target is the content container then prevent panning
        return annoSwitch;

    }
    const handleMouseDown = event => {
        if(annoSwitch){
        if (selectedId === null && newAnnotation.length === 0) {
            const { x, y } = event.target.getStage().getPointerPosition();
            // x = Math.round(x);
            // y = Math.round(y)
            setNewAnnotation([{ x: Math.round(x), y: Math.round(y), width: 0, height: 0, }]);
        } else {
            setNewAnnotation([]);
        }
        }
    };
    const handleMouseMove = event => {
        if(annoSwitch){
        if (selectedId === null && newAnnotation.length === 1) {
            const sx = newAnnotation[0].x;
            const sy = newAnnotation[0].y;
            const { x, y } = event.target.getStage().getPointerPosition();
            Math.max(x, canvasMeasures.width);
            Math.max(y, canvasMeasures.height);
            const width = Math.round(x - sx);
            const height = Math.round(y - sy);
            if (x < canvasMeasures.width || y < canvasMeasures.height) {
                setNewAnnotation([
                    {
                        x: sx,
                        y: sy,
                        width: Math.abs(width),
                        height: Math.abs(height),
                        //計算
                        UX: sx,
                        UY: sy,
                        LX: sx + Math.abs(width),
                        LY: sy + Math.abs(height),
                    }
                ]);
            }
        } else {
            return;
        }
        }
    };
    const handleMouseUp = () => {
        if(annoSwitch){
            if (selectedId === null && newAnnotation.length === 1) {
                setShow(true);
            }
        }
    };
    const handleMouseEnter = event => {
        if(annoSwitch){
        event.target.getStage().container().style.cursor = "crosshair";
        }
    };
    const handleDelete = () => {
        if (selectedId !== null) {
            const annotationsAfterDelete = annoList.filter(
                annotation => annotation.tempID !== selectedId
            );
            setDispatch({ type: 'update_annotations', newAnnotationList: annotationsAfterDelete, activePageId: activePageId })
        }
    };
    const handleEdit = () => {
        setShow(true);
    };
    return (
        <>
            <Row>
                <Col sm={9} className="main">
                    <PanZoom disabled={annoSwitch} >
                        <WorkArea tabIndex={1}>
                            <Stage
                                width={canvasMeasures.width}
                                height={canvasMeasures.height}
                                onMouseEnter={handleMouseEnter}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                ref={zoomRef}
                            >
                                <Layer>
                                    <ImageFromUrl
                                        setCanvasMeasures={setCanvasMeasures}
                                        imageUrl={annotation.PageSet[activePageId].FileContent}
                                        onMouseDown={() => {
                                            // deselect when clicked on empty area
                                            selectAnnotation(null);
                                            setEditItem(null);
                                        }}
                                    />
                                    {annotationsToDraw.map((item, i) => {
                                        return (
                                            <Annotation
                                                key={i}
                                                shapeProps={item}
                                                isSelected={item.tempID === selectedId}
                                                annoType={item.type}
                                                annoSwitch={annoSwitch}
                                                onSelect={() => {
                                                    selectAnnotation(item.tempID);
                                                    setEditItem(annoList.find(obj => {
                                                        return obj.tempID === item.tempID;
                                                    }))
                                                }}
                                                onChange={newAttrs => {
                                                    const rects = annoList.slice();
                                                    rects[i] = newAttrs;
                                                    setDispatch({ type: 'update_annotations', newAnnotationList: rects, activePageId: activePageId })
                                                }}
                                            />
                                        );
                                    })}
                                </Layer>
                            </Stage>
                        </WorkArea>
                    </PanZoom>
                </Col>
                <Col sm={3} className="side p-0 x-0 border-start">
                    <Accordion flush activeKey={selectedId}>
                        {annoList.map((item, i) => {
                            return (
                                <Accordion.Item key={item.tempID} id={item.tempID} eventKey={item.tempID} onClick={() => {
                                    setEditItem(annoList.find(obj => {
                                        return obj.tempID === item.tempID;
                                    }))
                                    selectAnnotation(item.tempID)
                                }}>
                                    <Accordion.Header><Badge bg={item.type === "title" ? "danger" : "primary"} className='me-2'>{item.type === "area" ? "資料區域" : "特徵區域"}</Badge>
                                        {item.IsAnchor === true && <FontAwesomeIcon className="icon me-1 text-primary" icon={faAnchor} />}
                                        {item.AreaName}</Accordion.Header>
                                    <Accordion.Body className='fs-6 d-flex flex-column'>
                                        {/* <span>pageNum: {item.pageNum}</span> */}
                                        <span>起始座標: {'('} {item.UX}, {item.UY} {')'}</span>
                                        <span>結束座標: {'('} {item.LX}, {item.LY} {')'} </span>
                                        <span>區域說明: {item.AreaDesc}</span>
                                        <span>標籤名稱: {item.Title}</span>
                                        {item.type === "title" && <span>標籤內容: {item.TitleContent}</span>}
                                        <span>是否為單行: {item.IsOneLine === true ? "是" : "否"}</span>
                                        <span>是否為英數字: {item.IsEng === true ? "是" : "否"}</span>
                                        <span>字數: {item.WordCount}</span>
                                        {/* <span>id={item.tempID}</span>*/}
                                        <div className="d-flex justify-content-end">
                                            <Button className="mx-1 btn-light" type="button" onClick={() => handleEdit()}>編輯</Button>
                                            <Button className="mx-1 btn-light" type="button" onClick={() => handleDelete()}>刪除</Button>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion>
                </Col>
            </Row>
            <AnnoInfoModal
                show={show}
                setShow={setShow}
                newAnnotation={newAnnotation}
                setNewAnnotation={setNewAnnotation}
                activePageId={activePageId}
                editItem={editItem}
            />
        </>

    )
}


export default MainCanvas;