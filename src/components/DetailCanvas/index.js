import React, { useEffect, useRef, useState,useCallback } from "react";
import { Wrapper, Canvas } from './DetailCanvas.styles';
import { useAPI } from "../apiContext";
import { PanZoom } from 'react-easy-panzoom';

//import testImg from '../../img/t1.png';

const DetailCanvas = ({ targetIndex, pageIndex }) => {
    const canvasSrc = useRef(null);
    const { pages } = useAPI();
    const pageBase = pages.PageSet[pageIndex];
    const [loaded, setLoaded] = useState(false);
    const drawCanvaDetail = useCallback(() => {
        let count = 2;
        //source canvas area
        const canvasSrcObj = canvasSrc.current;
        const canvasSrcCtx = canvasSrcObj.getContext('2d');
        const imgSrc = new Image();
        imgSrc.style = loaded ? {} : { display: 'none' };
        imgSrc.src = `http://10.3.228.224:8080/FPGProcessService/OCRAnnotation/HandleImage.ashx?`+pageBase.ResultSet[targetIndex].RawData;
        // imgSrc.src = `https://localhost:44375/HandleImage.ashx?`+pageBase.ResultSet[targetIndex].RawData;

        imgSrc.onload = () => {
            canvasSrcObj.width = imgSrc.width;
            canvasSrcObj.height = imgSrc.height;
            canvasSrcCtx.drawImage(imgSrc, 0, 0);;
            setLoaded(true);
        }
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