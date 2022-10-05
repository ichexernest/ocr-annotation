import React, { useState, useEffect } from 'react';

import { Stage, Layer } from 'react-konva';
import { v1 as uuidv1 } from "uuid";
import classNames from 'classnames';
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
import { useAPI } from "../annotationContext";

import { WorkArea } from './MainCanvas.styles';

const MainCanvas = ({ activePageId }) => {

    const { setDispatch, annotation } = useAPI();
    const annoList = annotation.PageSet[activePageId].SpecAreaSet.concat(annotation.PageSet[activePageId].SpecTitleSet);

    useEffect(() => {
        //annoList=annotation.PageSet[activePageId].SpecAreaSet.concat(annotation.PageSet[activePageId].SpecTitleSet);
    }, [activePageId]);

    const [annotations, setAnnotations] = useState([]);
    const [selectedId, selectAnnotation] = useState(null);
    const [canvasMeasures, setCanvasMeasures] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [show, setShow] = useState(false);
    const [eShow, setEShow] = useState(false);
    const [newAnnotation, setNewAnnotation] = useState([]);
    const zoomRef = React.useRef();
    const [editItem, setEditItem] = useState({});
    const annotationsToDraw = [...annoList, ...newAnnotation];

    const preventPan = (e, x, y) => {        // if the target is the content container then prevent panning
        return true;

    }
    const handleMouseDown = event => {
        if (selectedId === null && newAnnotation.length === 0) {
            const { x, y } = event.target.getStage().getPointerPosition();
           // x = Math.round(x);
           // y = Math.round(y)
            const id = uuidv1();
            setNewAnnotation([{ x:Math.round(x), y:Math.round(y), width: 0, height: 0, id }]);
        } else {
            setNewAnnotation([]);
        }
    };
    const handleMouseMove = event => {
        if (selectedId === null && newAnnotation.length === 1) {
            const sx = newAnnotation[0].x;
            const sy = newAnnotation[0].y;
            const { x, y } = event.target.getStage().getPointerPosition();
            Math.max(x, canvasMeasures.width);
            Math.max(y, canvasMeasures.height);
            const width = Math.round(x - sx);
            const height = Math.round(y - sy);
            const id = uuidv1();
            if (x < canvasMeasures.width || y < canvasMeasures.height) {
                setNewAnnotation([
                    {
                        id,
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
    };
    const handleMouseUp = () => {
        if (selectedId === null && newAnnotation.length === 1) {
            // alert(JSON.stringify(newAnnotation));
            setShow(true);
        } else {
            //改變已存在之標註
        }
    };
    const handleMouseEnter = event => {
        event.target.getStage().container().style.cursor = "crosshair";
    };
    const handleDelete = () => {
        if (selectedId !== null) {
            const annotationsAfterDelete = annoList.filter(
                annotation => annotation.id !== selectedId
            );
            //setAnnotations(annotationsAfterDelete);
            setDispatch({ type: 'edit_annotations', newAnnotationList: annotationsAfterDelete, activePageId: activePageId })
        }
    };
    const handleEdit = () => {
        setEditItem(annoList.find(obj => {
            return obj.id === selectedId;
        }))
        setEShow(true);
    };
    const handleSave = event => {

    };

    console.log(`ANNOTATIONS LIST CHECK:::` + JSON.stringify(annoList));
    return (
        <>
            <Row>
                <div className='d-flex justify-content-between align-items-center bg-white'><h3>{annotation.SpecID}</h3><Button onClick={() => handleSave()}>儲存</Button></div>
                <Col sm={9} className="main">
                    <PanZoom preventPan={preventPan}>
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
                                        imageUrl={annotation.PageSet[activePageId].FilePath}
                                        onMouseDown={() => {
                                            // deselect when clicked on empty area
                                            selectAnnotation(null);
                                        }}
                                    />
                                    {annotationsToDraw.map((item, i) => {
                                        return (
                                            <Annotation
                                                key={i}
                                                shapeProps={item}
                                                isSelected={item.id === selectedId}
                                                annoType={item.type}
                                                onSelect={() => {
                                                    selectAnnotation(item.id);
                                                }}
                                                onChange={newAttrs => {
                                                    const rects = annoList.slice();
                                                    rects[i] = newAttrs;
                                                    console.log(`RECT::: ` + JSON.stringify(rects))
                                                    //setAnnotations(rects);
                                                    setDispatch({ type: 'edit_annotations', newAnnotationList: rects, activePageId: activePageId })
                                                }}
                                            />
                                        );
                                    })}
                                </Layer>
                            </Stage>
                        </WorkArea>
                    </PanZoom>
                </Col>
                <Col sm={3} className="side">
                    <Accordion flush activeKey={selectedId}>
                        {annoList.map((item, i) => {
                            return (
                                <Accordion.Item eventKey={item.id} onClick={() => selectAnnotation(item.id)}>
                                    <Accordion.Header><Badge bg={item.type === "title" ? "danger" : "primary"} className='me-2'>{item.type.toUpperCase()}</Badge>
                                        {item.IsAnchor === 1 && <FontAwesomeIcon className="icon me-1 text-primary" icon={faAnchor} />}
                                        {item.AreaName}</Accordion.Header>
                                    <Accordion.Body className='fs-6 d-flex flex-column'>
                                        {/* <span>pageNum: {item.pageNum}</span> */}
                                        <span>areaID: {item.AreaID}</span>
                                        <span>區域說明: {item.AreaDesc}</span>
                                        <span>標籤名稱: {item.Title}</span>
                                        {item.type === "title" && <span>標籤內容: {item.TitleContent}</span>}
                                        <span>是否為單行: {item.IsOneLine === 1 ? "是" : "否"}</span>
                                        <span>是否為英數字: {item.IsEng === 1 ? "是" : "否"}</span>
                                        <span>字數: {item.WordCount}</span>
                                        {/* <span>id={item.id}</span>*/}
                                        <span>UX: {item.UX}</span>
                                        <span>UY: {item.UY}</span>
                                        <span>LX: {item.LX}</span>
                                        <span>LY: {item.LY}</span>
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