import React, { Fragment } from 'react';
import spinner from '../assets/images/spinner.gif'

const Loader = () =>
(
    <Fragment>
        <img src={spinner} style={{ width: '100px', margin: 'auto', display: 'block' }}
            alt="Loading..." />
    </Fragment>
)


export default Loader;