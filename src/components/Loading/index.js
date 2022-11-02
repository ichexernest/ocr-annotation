import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import { LoadingBg, LoadingContent } from './Loading.styles';

const Loading = ({ show }) => {
    if (!show) return null;
    return (
            <LoadingBg>
                <LoadingContent className="d-flex flex-column justicy-content-center align-items-center">
                    <Spinner className='content mb-3' animation="grow" variant="light" />
                    <h2 className='text-light'>Loading...</h2>
                </LoadingContent>
            </LoadingBg>
    );
}

export default Loading;