import React, { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';

import classNames from 'classnames';
import { Wrapper, Grid, ContentList } from './ContentArea.styles';
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
        <Wrapper className="border-start "> 
            <Grid className="border-bottom " isMain={true}>
                {pages.PageSet[activePageId].ResultSet[activeTargetId] ?
                    <ContentCanvas
                        targetIndex={activeTargetId}
                        pageIndex={activePageId}
                    /> :
                    <ContentCanvas
                        targetIndex={0}
                        pageIndex={activePageId}
                    />}
                <ResultList
                    activeTargetId={activeTargetId}
                    pageIndex={activePageId}
                    setActiveTargetId={setActiveTargetId} />
            </Grid>
            <Grid isMain={false}>
                {pages.PageSet[activePageId].ResultSet[activeTargetId] ?
                    <>
                        <DetailCanvas
                            targetIndex={activeTargetId}
                            pageIndex={activePageId} />
                        <DetailInfo
                            targetIndex={activeTargetId}
                            pageIndex={activePageId} />
                    </>
                    :
                    <>
                        <DetailCanvas
                            targetIndex={0}
                            pageIndex={activePageId} />
                        <DetailInfo
                            targetIndex={0}
                            pageIndex={activePageId} />
                    </>
                }
            </Grid>
        </Wrapper>
    )
}

const ResultList = ({ setActiveTargetId, activeTargetId, pageIndex }) => {
    const { pages } = useAPI();
    const handleSelectTarget = (i) => {
        console.log(`listItem clicked ${i}${pages.PageSet[pageIndex].ResultSet.length}`)
        //切頁超過最大筆數會抓不到
        setActiveTargetId(i);
    }

    return (
        <div className="d-flex flex-column bg-white">
            <ContentList>
                <ul>
                    {pages.PageSet[pageIndex].ResultSet.map((item, index) => {
                        let liClasses = classNames({
                            'active': (activeTargetId === index) ? true : false,
                            'text-danger': (item.ProcStatus === 51) ? true : false,
                        });
                        return (
                            <li
                                key={item.AreaID}
                                className={liClasses}
                                onClick={() => handleSelectTarget(index)}
                                title={`areaID:${item.AreaID}`}>{item.AreaID}</li>
                        )
                    })}
                </ul>
            </ContentList>
        </div>
    );
}

export default ContentArea;