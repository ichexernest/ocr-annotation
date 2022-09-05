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
                stroke={isSelected?"lightgreen":"red"}
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
                        x: Math.round(event.target.x()),
                        y: Math.round(event.target.y()),
                        ulx: ulx + (Math.round(event.target.x()) - ox),
                        uly: uly + (Math.round(event.target.y()) - oy),
                        brx: brx + (Math.round(event.target.x()) - ox),
                        bry: bry + (Math.round(event.target.y()) - oy),
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
                    const x = Math.round(node.width() * scaleX) <0 ? Math.round(node.x()) + Math.round(node.width() * scaleX) : Math.round(node.x());
                    const y = Math.round(node.height() * scaleY) <0 ? Math.round(node.y()) + Math.round(node.height() * scaleY) : Math.round(node.y());
                    const ulx = shapeProps.ulx;
                    const uly = shapeProps.uly;
                    const brx = shapeProps.brx;
                    const bry = shapeProps.bry;
                    //console.log(`node`+node)
                    // we will reset it back
                    console.log(`S: `+scaleX);
                    console.log(`S: `+node.scaleX());
                    node.scaleX(1);
                    node.scaleY(1);
                    console.log(`E: `+scaleX);
                    console.log(`E: `+node.scaleX());
                    onChange({
                        ...shapeProps,
                        x: x,
                        y: y,
                        // set minimal value
                        width: Math.max(5, Math.round(node.width() * scaleX)),
                        height: Math.max(5, Math.round(node.height() * scaleY)),
                        ulx: x,
                        uly: y,
                        brx: x + Math.max(5, Math.round(node.width() * scaleX)),
                        bry: y + Math.max(5, Math.round(node.height() * scaleY))
                    });
                }}
            />
            {isSelected && <Transformer ref={transformRef} rotateEnabled={false} resizeEnabled={false}/>}
        </>
    );
};

export default Annotation;
