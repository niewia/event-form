import React, { Component } from 'react';
import ErrorBox from '../error-box/ErrorBox';
import './TextArea.less';
const classNames = require('classnames');

export default class TextArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue || '',
            showError: false
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
            showError: false
        });
        this.props.onChange && this.props.onChange(event);
    }

    validate = () => {
        if (this.state.value.length === 0) {
            this.setState({ showError: true });
            return false;
        }
        return true;
    }

    render() {
        return (
            <div>
                <div className={classNames({
                    'labeled-control': true,
                    'text-area-wrapper': true,
                    'error': this.state.showError
                })}>
                    <label className={this.props.required ? 'required' : null}>{this.props.title}</label>
                    <div>
                        <textarea
                            data-testid='TextArea'
                            placeholder={this.props.placeholder}
                            maxLength={this.props.maxLength}
                            defaultValue={this.state.value}
                            onChange={this.handleChange}
                        ></textarea>
                        {this.state.showError &&
                            <ErrorBox errorMessage='This field is required'></ErrorBox>
                        }
                        <div className='form-field-legend'>
                            <span data-testid='description-length-legend'>{this.props.legend}</span>
                            <span data-testid='description-length'>{this.state.value.length}/{this.props.maxLength}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}