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
                stroke={isSelected ? "lightgreen" : "red"}
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
                    const ux = shapeProps.ux;
                    const uy = shapeProps.uy;
                    const lx = shapeProps.lx;
                    const ly = shapeProps.ly;
                    onChange({
                        ...shapeProps,
                        x: Math.round(event.target.x()),
                        y: Math.round(event.target.y()),
                        ux: ux + (Math.round(event.target.x()) - ox),
                        uy: uy + (Math.round(event.target.y()) - oy),
                        lx: lx + (Math.round(event.target.x()) - ox),
                        ly: ly + (Math.round(event.target.y()) - oy),
                    });
                }}
                onTransformEnd={event => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY)
                    });
                }}
            />
            {isSelected && <Transformer ref={transformRef} rotateEnabled={false} resizeEnabled={false} />}
        </>
    );
};

export default Annotation;
