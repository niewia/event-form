import React, { Component } from 'react';
import './Payment.less';

export default class Payments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPaid: false,
            fee: 0,
            showError: false
        }
    }

    onFeeChange = (event) => {
        this.setState({
            fee: +event.target.value
        });
        this.props.onChange && this.props.onChange(event);
    }

    onPaidChange = () => {
        this.setState({
            isPaid: !this.state.isPaid,
            fee: 0
        });
    }

    render() {
        return (
            <div className='labeled-control'>
                <label className={this.props.required ? 'required' : null}>{this.props.title}</label>
                <div>
                    <div className='payment-wrapper'>
                        <div className='choice-wrapper' onChange={this.onPaidChange}>
                            <div className='choice'>
                                <input type='radio' name='paid' value='false' checked={!this.state.isPaid} />
                                <div className='secondary-text'>Free event</div>
                            </div>
                            <div className='choice'>
                                <input type='radio' name='paid' value='true' checked={this.state.isPaid} />
                                <div className='secondary-text'>Paid event</div>
                            </div>
                        </div>
                        <div className='fee' style={{ opacity: this.state.isPaid ? 1 : 0 }}>
                            <input
                                placeholder='Fee'
                                onChange={this.onFeeChange}
                                type='number'
                            />
                            {this.state.showError &&
                                <div className='form-field-error-message'>Enter price or select 'Free event'</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}