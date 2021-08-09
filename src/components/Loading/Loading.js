import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = (props) => {
    return (
        <div>
            <Spinner type="grow" color="primary" size="lg" />
        </div>
    );
}

export default Loading;