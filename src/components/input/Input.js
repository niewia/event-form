import React, { Component } from 'react';
import ErrorBox from '../error-box/ErrorBox';
import './Input.less';
const classNames = require('classnames');

export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            showError: false,
            errorMessage: 'This field is required'
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        let errorMessage = '';
        let showError = false;
        if (this.props.realTimeValidation) {
            errorMessage = this.props.realTimeValidation(value);
            showError = !!errorMessage.length;
        }
        this.setState({
            value: value,
            errorMessage: errorMessage,
            showError: showError
        });
        this.props.onChange && this.props.onChange(event);
    }

    asyncValidate = (validationFn) => {
        return validationFn(this.state.value).then(errorMessage => {
            const isValid = !errorMessage || errorMessage.length === 0;
            if (!isValid) this.setState({
                showError: true,
                errorMessage: errorMessage
            });
            return isValid;
        });
    }

    render() {
        return (
            <div className={classNames({ 'form-field-wrapper': true, 'error': this.state.showError })}>
                <div className='labeled-control'>
                    <label className={this.props.required ? 'required' : null}>{this.props.title}</label>
                    <input
                        placeholder={this.props.placeholder}
                        type={this.props.type || 'text'}
                        defaultValue={this.state.value}
                        onChange={this.handleChange}
                    />
                </div>
                {this.state.showError &&
                    <ErrorBox errorMessage={this.state.errorMessage || this.props.errorMessage}></ErrorBox>
                }
            </div>
        )
    }
}