import React, { useEffect } from "react";
import { Rect, Transformer } from "react-konva";

const Annotation = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const transformRef = React.useRef();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            transformRef.current.setNode(shapeRef.current);
            transformRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const onMouseEnter = event => {
        event.target.getStage().container().style.cursor = "move";
    };

    const onMouseLeave = event => {
        event.target.getStage().container().style.cursor = "crosshair";
    };

    return (
        <>
            <Rect
                fill="transparent"
                stroke="red"
                onMouseDown={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onDragEnd={event => {
                    console.log(`onchangeB` + JSON.stringify(shapeProps));
                    const ox = shapeProps.x;
                    const oy = shapeProps.y;
                    const ulx = shapeProps.ulx;
                    const uly = shapeProps.uly;
                    const brx = shapeProps.brx;
                    const bry = shapeProps.bry;
                    onChange({
                        ...shapeProps,
                        x: event.target.x(),
                        y: event.target.y(),
                        ulx: ulx + (event.target.x() - ox),
                        uly: uly + (event.target.y() - oy),
                        brx: brx + (event.target.x() - ox),
                        bry: bry + (event.target.y() - oy),
                    });
                }}
                onTransformEnd={event => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    console.log(`onTransformEnd => onchangeB: ` + JSON.stringify(shapeProps));
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    const ulx = shapeProps.ulx;
                    const uly = shapeProps.uly;
                    const brx = shapeProps.brx;
                    const bry = shapeProps.bry;
                    //console.log(`node`+node)
                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: Math.round(node.x()),
                        y: Math.round(node.y()),
                        // set minimal value
                        width: Math.max(5, Math.round(node.width() * scaleX)),
                        height: Math.max(Math.round(node.height() * scaleY)),
                        ulx: Math.round(node.x()),
                        uly: Math.round(node.y()),
                        brx: Math.round(node.x()) + Math.max(5, Math.round(node.width() * scaleX)),
                        bry: Math.round(node.y()) + Math.max(5, Math.round(node.height() * scaleY))
                    });
                }}
            />
            {isSelected && <Transformer ref={transformRef} rotateEnabled={false} />}
        </>
    );
};

export default Annotation;
