import React, { useState } from 'react';

import { Stage, Layer } from 'react-konva';
import { v1 as uuidv1 } from "uuid";
import classNames from 'classnames';
import { PanZoom } from 'react-easy-panzoom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ImageFromUrl from "../ImageFormUrl";
import Annotation from "../Annotation";
import AnnoInfoModal from '../AnnoInfoModal';

import { AnnotationItem } from './MainCanvas.styles';

const MainCanvas = ({ currentImg }) => {
    const [annotations, setAnnotations] = useState([]);
    const [selectedId, selectAnnotation] = useState(null);
    const [canvasMeasures, setCanvasMeasures] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [show, setShow] = useState(false);
    const [newAnnotation, setNewAnnotation] = useState([]);
    const zoomRef = React.useRef();
    const preventPan = (e, x, y) => {
        // if the target is the content container then prevent panning
        if (e.target === zoomRef) {
            return true;
        }

        const contentRect = zoomRef.getBoundingClientRect()

        const x1 = contentRect.left
        const x2 = contentRect.right
        const y1 = contentRect.top
        const y2 = contentRect.bottom

        return (x >= x1 && x <= x2) && (y >= y1 && y <= y2)

    }

    const handleMouseDown = event => {
        if (selectedId === null && newAnnotation.length === 0) {
            const { x, y } = event.target.getStage().getPointerPosition();
            const id = uuidv1();
            setNewAnnotation([{ x, y, width: 0, height: 0, id }]);
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
            const ux = x < sx ? sx + width : sx;
            const uy = y < sy ? sy + height : sy;
            const lx = ux + Math.abs(width);
            const ly = uy + Math.abs(height);
            const id = uuidv1();
            const name = '';
            setNewAnnotation([
                {
                    x: sx,
                    y: sy,
                    width: Math.abs(width),
                    height: Math.abs(height),
                    //計算
                    ux: ux,
                    uy: uy,
                    lx: lx,
                    ly: ly,
                    id,
                    name
                }
            ]);
        }
    };

    const handleMouseUp = () => {
        if (selectedId === null && newAnnotation.length === 1) {
            // alert(JSON.stringify(newAnnotation));
            setShow(true);
        } else {
            //改變已存在之標註
            //            alert(`exsssssiiiiiiiit` +JSON.stringify(annotations));
        }
    };

    const handleMouseEnter = event => {
        event.target.getStage().container().style.cursor = "crosshair";
    };

    const handleKeyDown = event => {
        if (event.keyCode === 8 || event.keyCode === 46) {
            if (selectedId !== null) {
                const newAnnotations = annotations.filter(
                    annotation => annotation.id !== selectedId
                );
                setAnnotations(newAnnotations);
            }
        }
    };

    const annotationsToDraw = [...annotations, ...newAnnotation];

    return (
        <>
            <Row>
                <Col sm={9} className="main">
                    <PanZoom preventPan={preventPan}>
                        <div tabIndex={1} onKeyDown={handleKeyDown} ref={zoomRef}>
                            <Stage
                                width={canvasMeasures.width}
                                height={canvasMeasures.height}
                                onMouseEnter={handleMouseEnter}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                            >
                                <Layer>
                                    <ImageFromUrl
                                        setCanvasMeasures={setCanvasMeasures}
                                        imageUrl={currentImg}
                                        onMouseDown={() => {
                                            // deselect when clicked on empty area
                                            selectAnnotation(null);
                                        }}
                                    />
                                    {annotationsToDraw.map((annotation, i) => {
                                        return (
                                            <Annotation
                                                key={i}
                                                shapeProps={annotation}
                                                isSelected={annotation.id === selectedId}
                                                annoType={annotation.type}
                                                onSelect={() => {
                                                    selectAnnotation(annotation.id);
                                                }}
                                                onChange={newAttrs => {
                                                    const rects = annotations.slice();
                                                    rects[i] = newAttrs;
                                                    setAnnotations(rects);
                                                }}
                                            />
                                        );
                                    })}
                                </Layer>
                            </Stage>
                        </div>
                    </PanZoom>
                </Col>
                <Col sm={3} className="side">
                    <ul>
                        {annotations.map((annotation, i) => {
                            let itemClasses = classNames({
                                'active': (annotation.id === selectedId) ? true : false,
                            });
                            return (
                                <AnnotationItem key={i} className={itemClasses} onClick={() => selectAnnotation(annotation.id)}>
                                    <span>type: {annotation.type}</span><br />
                                    <span>pageNum: {annotation.pageNum}</span><br />
                                    <span>specID: {annotation.specID}</span><br />
                                    <span>areaID: {annotation.areaID}</span><br />
                                    <span>id={annotation.id}</span><br />
                                    <span>ux: {annotation.ux}</span><br />
                                    <span>uy: {annotation.uy}</span><br />
                                    <span>lx: {annotation.lx}</span><br />
                                    <span>ly: {annotation.ly}</span><br />
                                    <span>區域名稱: {annotation.areaName}</span><br />
                                    <span>區域說明: {annotation.areaDesc}</span><br />
                                    <span>標籤名稱: {annotation.title}</span><br />
                                    <span>標籤內容: {annotation.titleContent}</span><br />
                                    <span>是否為單行: {annotation.isOneLine}</span><br />
                                    <span>是否為英數字: {annotation.isEng}</span><br />
                                    <span>字數: {annotation.wordCount}</span><br />
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
                annotations={annotations}
                setAnnotations={setAnnotations}
            />
        </>

    )
}


export default MainCanvas;