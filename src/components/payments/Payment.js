import React, { Component } from 'react';
import './Payment.less';

export default class Payments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPaid: false,
            fee: 100,
            showError: false
        }
    }

    onFeeChange = (event) => {
        this.setState({
            fee: event.target.value
        });
        this.props.onChange && this.props.onChange(event);
    }

    onPaidChange = () => {
        this.setState({
            isPaid: !this.state.isPaid
        });
    }

    validate = () => {
        if (this.state.isPaid && this.state.fee < 1) {
            this.setState({ showError: true });
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className='labeled-control'>
                <label className={this.props.required ? 'required' : null}>{this.props.title}</label>
                <div>
                    <div onChange={this.onPaidChange} className='choice-wrapper'>
                        <div className='choice'>
                            <input type='radio' name='paid' value='false' checked={!this.state.isPaid} />
                            <div className='secondary-text'>Free event</div>
                        </div>
                        <div className='choice'>
                            <input type='radio' name='paid' value='true' checked={this.state.isPaid} />
                            <div className='secondary-text'>Paid event</div>
                        </div>
                    </div>
                    {this.state.isPaid &&
                        <div>
                            <span>Fee</span>
                            <input
                                defaultValue={this.state.fee}
                                onChange={this.onFeeChange}
                                type='number'
                                min={0}
                                max={1000000}
                            />
                            {this.state.showError &&
                                <div className='form-field-error-message'>Enter price or select 'Free event'</div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}