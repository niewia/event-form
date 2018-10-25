import React from 'react';
import './ErrorBox.less';

export default function (props) {

    return (
        <div className='form-field-error-wrapper'>
            <div className='form-field-error-message'>{props.errorMessage}</div>
        </div>
    )
}