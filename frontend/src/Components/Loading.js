
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div>
            <Spinner animation="grow" variant="danger" style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}>
                <span className="sr-only" >LoadinG...</span>
            </Spinner>
        </div>
    )
}

export default Loader;
