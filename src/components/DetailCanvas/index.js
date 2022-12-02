import React, { useEffect, useRef, useState,useCallback } from "react";
import { Wrapper, Canvas } from './DetailCanvas.styles';
import { useAPI } from "../apiContext";
import { PanZoom } from 'react-easy-panzoom';


const DetailCanvas = ({ targetIndex, pageIndex }) => {
    const canvasSrc = useRef(null);
    const { pages } = useAPI();
    const pageBase = pages.pageList[pageIndex];
    const [loaded, setLoaded] = useState(false);
    const drawCanvaDetail = useCallback(() => {
        let count = 2;
        //source canvas area
        const canvasSrcObj = canvasSrc.current;
        const canvasSrcCtx = canvasSrcObj.getContext('2d');
        const imgSrc = new Image();
        imgSrc.style = loaded ? {} : { display: 'none' };
        imgSrc.src = pageBase.FilePathSets[4];
        imgSrc.onload = () => {
            canvasSrcObj.width = pageBase.Sets[targetIndex].Rect.Width;
            canvasSrcObj.height = pageBase.Sets[targetIndex].Rect.Height;
            canvasSrcCtx.drawImage(
                imgSrc,
                pageBase.Sets[targetIndex].Rect.X,
                pageBase.Sets[targetIndex].Rect.Y,
                pageBase.Sets[targetIndex].Rect.Width,
                pageBase.Sets[targetIndex].Rect.Height,
                0, 0,
                pageBase.Sets[targetIndex].Rect.Width,
                pageBase.Sets[targetIndex].Rect.Height
            );
            count--;
        }
        if (count === 0) setLoaded(true);
    }, [targetIndex, loaded, pageBase]);
    
    useEffect(() => { drawCanvaDetail() }, [drawCanvaDetail]);

    return (
        <Wrapper>
                <PanZoom
                    boundaryRatioVertical={0.9}
                    boundaryRatioHorizontal={0.9}
                    enableBoundingBox>
                    <Canvas ref={canvasSrc} />
                </PanZoom>
        </Wrapper>
    )
}

export default DetailCanvas;