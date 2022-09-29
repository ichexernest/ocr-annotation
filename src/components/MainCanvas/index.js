import React, { useState,useEffect } from 'react';

import { Stage, Layer } from 'react-konva';
import { v1 as uuidv1 } from "uuid";
import classNames from 'classnames';
import { PanZoom } from 'react-easy-panzoom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import ImageFromUrl from "../ImageFormUrl";
import Annotation from "../Annotation";
import AnnoInfoModal from '../AnnoInfoModal';
import { useAPI } from "../annotationContext";

import { AnnotationItem, WorkArea } from './MainCanvas.styles';

const MainCanvas = ({ activePageId }) => {

    const { setDispatch, annotation } = useAPI();
    const alfa =annotation.PageSet[activePageId].SpecAreaSet.concat(annotation.PageSet[activePageId].SpecTitleSet);
    //console.log(`MAINCANVA :::`+JSON.stringify(annotation));
    console.log(`MAINCANVA activePageId :::`+ annotation.PageSet[activePageId].PageNum);
    useEffect(() => {
        //setAnnotations(annotation.PageSet[activePageId].SpecAreaSet.concat(annotation.PageSet[activePageId].SpecTitleSet));
        //alfa =annotation.PageSet[activePageId].SpecAreaSet.concat(annotation.PageSet[activePageId].SpecTitleSet);
        console.log(JSON.stringify(alfa))
    }, [activePageId]);

    //const [annotations, setAnnotations] = useState([]);
    const [selectedId, selectAnnotation] = useState(null);
    const [canvasMeasures, setCanvasMeasures] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [show, setShow] = useState(false);
    const [newAnnotation, setNewAnnotation] = useState([]);
    const zoomRef = React.useRef();

    const annotationsToDraw = [...alfa, ...newAnnotation];

    const preventPan = (e, x, y) => {        // if the target is the content container then prevent panning
            return true;
        
    }
    const handleMouseDown = event => {
        if (selectedId === null && newAnnotation.length === 0) {
            const { x, y } = event.target.getStage().getPointerPosition();
            const id = uuidv1();
            setNewAnnotation([{x, y, width: 0, height: 0, id }]);
        }else{
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
            if(x<canvasMeasures.width ||y<canvasMeasures.height){
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
        }else{
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
    const handleKeyDown = event => {
        if (event.keyCode === 8 || event.keyCode === 46) {
            if (selectedId !== null) {
                const annotationsAfterDelete = alfa.filter(
                    annotation => annotation.id !== selectedId
                );
                //setAnnotations(annotationsAfterDelete);
                setDispatch({ type: 'edit_annotations', newAnnotationList: annotationsAfterDelete ,activePageId:activePageId})
            }
        }
    };

    return (
        <>
            <Row>
                <Col sm={9} className="main">
                    <PanZoom preventPan={preventPan}>
                        <WorkArea tabIndex={1} onKeyDown={handleKeyDown}>
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
                                                    const rects = alfa.slice();
                                                    rects[i] = newAttrs;
                                                    //setAnnotations(rects);
                                                    setDispatch({ type: 'edit_annotations', newAnnotations: rects, activePageId:activePageId })
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
                    <ul>
                        {alfa.map((item, i) => {
                            let itemClasses = classNames({
                                'active': (item.id === selectedId) ? true : false,
                            });
                            return (
                                <AnnotationItem key={i} className={itemClasses} onClick={() => selectAnnotation(item.id)}>
                                    <span>type: {item.type}</span><br />
                                    <span>pageNum: {item.pageNum}</span><br />
                                    <span>areaID: {item.AreaID}</span><br />
                                    <span>id={item.id}</span><br />
                                    <span>UX: {item.UX}</span><br />
                                    <span>UY: {item.UY}</span><br />
                                    <span>LX: {item.LX}</span><br />
                                    <span>LY: {item.LY}</span><br />
                                    <span>區域名稱: {item.AreaName}</span><br />
                                    <span>區域說明: {item.AreaDesc}</span><br />
                                    <span>標籤名稱: {item.Title}</span><br />
                                    <span>標籤內容: {item.TitleContent}</span><br />
                                    <span>是否為單行: {item.IsOneLine}</span><br />
                                    <span>是否為英數字: {item.IsEng}</span><br />
                                    <span>字數: {item.WordCount}</span><br />
                                    <button>編輯資訊</button>
                                    <button>刪除</button>
                                </AnnotationItem>
                            );
                        })}
                    </ul>
                </Col>
            </Row>
            <AnnoInfoModal
                show={show}
                setShow={setShow}
                newAnnotation={newAnnotation}
                setNewAnnotation={setNewAnnotation}
                activePageId={activePageId}
                //annotations={annotations}
                //setAnnotations={setAnnotations}
            />
        </>

    )
}


export default MainCanvas;