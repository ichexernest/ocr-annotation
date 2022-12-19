import React, { useEffect, useRef, useState, useCallback } from "react";
import { Wrapper, Canvas, Loading } from './ContentCanvas.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAPI } from "../apiContext";
import { PanZoom } from 'react-easy-panzoom'

//import testImg from '../img/t1.png';
const PATH_URL = process.env.REACT_APP_PATH_URL;

const ContentCanvas = ({ targetIndex, pageIndex }) => {
    const canvasRef = useRef(null);
    const { pages } = useAPI();
    const pageBase = pages.PageSet[pageIndex];
    const [loaded, setLoaded] = useState(false);
    const drawCanva = useCallback(() => {
        //let count = 1;
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        const ctx2 = canvasObj.getContext('2d');
        const img = new Image();
        img.src = `${PATH_URL}/HandleImage.ashx?` + pageBase.FileContent;

        img.onload = () => {
            //setLoad(false);
            canvasObj.height = img.height;
            canvasObj.width = img.width;
            ctx.drawImage(img, 0, 0);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "red";
            ctx.strokeRect(
                pageBase.ResultSet[targetIndex].UX,
                pageBase.ResultSet[targetIndex].UY,
                pageBase.ResultSet[targetIndex].width,
                pageBase.ResultSet[targetIndex].height);
            pageBase.ResultSet.forEach((element,index) => {
                ctx2.lineWidth = 3;
                
                ctx2.strokeStyle = index === targetIndex ? "lime": "red";
                ctx.strokeRect(
                    element.UX,
                    element.UY,
                    element.width,
                    element.height);
                
            });

            //count--;

            setLoaded(true);
        }
    }, [targetIndex, pageBase]);
    useEffect(() => { drawCanva() }, [drawCanva]);
    return (
        <Wrapper>
            <PanZoom
                boundaryRatioVertical={0.9}
                boundaryRatioHorizontal={0.9}
                enableBoundingBox>
                <Loading hasLoad={loaded}>
                    <FontAwesomeIcon className="icon" icon={faSpinner} size="4x" spin />
                </Loading>
                <Canvas ref={canvasRef} />
            </PanZoom>
        </Wrapper>
    )
}

export default ContentCanvas;