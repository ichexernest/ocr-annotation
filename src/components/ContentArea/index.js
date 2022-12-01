import React, { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';

import classNames from 'classnames';
import { Wrapper, ControlBar, Grid, ContentList } from './ContentArea.styles';
import ContentCanvas from '../ContentCanvas';
import DetailCanvas from '../DetailCanvas';
import DetailInfo from '../DetailInfo';
import { useAPI } from "../apiContext";

const ContentArea = ({ activePageId }) => {
    const [activeTargetId, setActiveTargetId] = useState(0); //active ocr area
    const { pages } = useAPI();

    useEffect(() => {
        setActiveTargetId(0)
    }, [activePageId])

    return (
        <Wrapper>
            <Grid isMain={true}>
                <ListItem
                    activeTargetId={activeTargetId}
                    pageIndex={activePageId}
                    setActiveTargetId={setActiveTargetId} />
                {pages.pageList[activePageId].Sets[activeTargetId] ?
                    <ContentCanvas
                        targetIndex={activeTargetId}
                        pageIndex={activePageId}
                    /> :
                    <ContentCanvas
                        targetIndex={0}
                        pageIndex={activePageId}
                    />}
            </Grid>
            <Grid isMain={false}>
                {pages.pageList[activePageId].Sets[activeTargetId] ?
                    <>
                        <DetailInfo
                            targetIndex={activeTargetId}
                            pageIndex={activePageId} />
                        <DetailCanvas
                            targetIndex={activeTargetId}
                            pageIndex={activePageId} />
                    </>
                    :
                    <>
                        <DetailInfo
                            targetIndex={0}
                            pageIndex={activePageId} />
                        <DetailCanvas
                            targetIndex={0}
                            pageIndex={activePageId} />
                    </>
                }
            </Grid>
        </Wrapper>
    )
}

const ListItem = ({ setActiveTargetId, activeTargetId, pageIndex }) => {
    const [hide, setHide] = useState(false);
    const { pages } = useAPI();
    const handleSelectTarget = (i) => {
        console.log(`listItem clicked ${i}${pages.pageList[pageIndex].Sets.length}`)
        //切頁超過最大筆數會抓不到
        setActiveTargetId(i);
    }
    const changeList = () => {
        setHide(!hide);
    }

    return (
        <div className="d-flex flex-column">
        <Button className="m-2 btn-dark" onClick={() => changeList()}>{hide?"顯示全部":"僅顯示標註項目"}</Button>
        <ContentList>
            <ul>
                {pages.pageList[pageIndex].Sets.map((item, index) => {
                    let liClasses = classNames({
                        'success': (item.OcrSSIM < 1 && item.Pass) ? true : false,
                        'error': (item.OcrSSIM < 1 && !item.Pass) ? true : false,
                        'active': (activeTargetId === index) ? true : false,
                        'd-none': (item.OcrSSIM === 1) ? hide : false,
                    });
                    return (
                        <li
                            key={item.BoxIndex}
                            className={liClasses}
                            onClick={() => handleSelectTarget(index)}
                            title={`ocr:${item.OcrSSIM}/src:${item.SrcText}`}>{item.BoxIndex}. {item.SrcText}:{item.OcrSSIM}</li>
                    )
                })}
            </ul>
        </ContentList>
        </div>
    );
}

export default ContentArea;