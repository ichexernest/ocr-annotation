import React, { useEffect } from "react";
import { Rect, Transformer } from "react-konva";

const Annotation = ({ shapeProps, isSelected, annoType, onSelect, onChange }) => {
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

    // shapeProps.x = shapeProps.UX;
    // shapeProps.y = shapeProps.UY;
    // shapeProps.width = shapeProps.LX-shapeProps.UX;
    // shapeProps.height = shapeProps.LY-shapeProps.UY;

    return (
        <>
            <Rect
                fill="transparent"
                stroke={isSelected ? "lightgreen" : annoType==="area"?"red":annoType==="title"?"#800010":"lightgreen"}
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
                    const ux = shapeProps.UX;
                    const uy = shapeProps.UY;
                    const lx = shapeProps.LX;
                    const ly = shapeProps.LY;
                    onChange({
                        ...shapeProps,
                        x: Math.round(event.target.x()),
                        y: Math.round(event.target.y()),
                        UX: ux + (Math.round(event.target.x()) - ox),
                        UY: uy + (Math.round(event.target.y()) - oy),
                        LX: lx + (Math.round(event.target.x()) - ox),
                        LY: ly + (Math.round(event.target.y()) - oy),
                    });
                }}
                // onTransformEnd={event => {
                //     // transformer is changing scale of the node
                //     // and NOT its width or height
                //     // but in the store we have only width and height
                //     // to match the data better we will reset scale on transform end
                //     const node = shapeRef.current;
                //     const scaleX = node.scaleX();
                //     const scaleY = node.scaleY();

                //     // we will reset it back
                //     node.scaleX(1);
                //     node.scaleY(1);
                //     onChange({
                //         ...shapeProps,
                //         x: node.x(),
                //         y: node.y(),
                //         // set minimal value
                //         width: Math.max(5, node.width() * scaleX),
                //         height: Math.max(node.height() * scaleY)
                //     });
                // }}
            />
            {isSelected && <Transformer ref={transformRef} rotateEnabled={false} resizeEnabled={false} />}
        </>
    );
};

export default Annotation;
