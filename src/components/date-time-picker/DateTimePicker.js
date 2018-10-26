import React, { Component } from 'react';
import ErrorBox from '../error-box/ErrorBox';
import moment from 'moment';
import './DateTimePicker.less';
const classNames = require('classnames');

export default class DateTimePicker extends Component {

    constructor(props) {
        super(props);
        const now = moment();
        let am = true;
        if (now.hour() > 12) {
            now.set({ hour: now.hour() - 12 })
            am = false;
        }
        const format = props.format || 'YYYY-MM-DDTHH:mm';
        this.state = {
            format: format,
            time: now,
            date: moment(),
            am: am,
            value: moment().format(format),
            dateTimeValid: true,
            showError: false
        }
    }

    onDateChange = (event) => {
        this.setState({
            date: moment(event.target.value)
        }, this.emitChange)
    }

    onTimeChange = (event) => {
        const newTime = moment(event.target.value, 'HH:mm');
        let am = true;
        if (newTime.hour() === 0) {
            newTime.set({ hour: 12 })
        }
        else if (newTime.hour() > 12) {
            am = false;
            newTime.set({ hour: newTime.hour() - 12 })
        }
        this.setState({
            time: newTime,
            am: am
        }, this.emitChange)
    }

    onAmPmChange = (event) => {
        this.setState({
            am: !this.state.am
        }, this.emitChange)
    }

    emitChange = () => {
        let hour = this.state.time.hour();
        if (this.state.am && hour === 12) {
            hour = 0;
        } else if (!this.state.am && hour !== 12) {
            hour = hour + 12
        }

        const newDate = new moment(this.state.date).set({
            hour: hour,
            minutes: this.state.time.minutes()
        }).format(this.state.format);

        this.setState({
            value: newDate,
            showError: false
        });
        this.props.onChange && this.props.onChange(newDate);
    }

    validate = (validationFn) => {
        const isValid = validationFn(this.state.value);
        if (!isValid) {
            this.setState({ showError: true });
        }
        return isValid;
    }

    handleOnClick = () => {
        this.setState({ showError: false });
    }

    render() {
        return (
            <div className={classNames({'date-time-picker-wrapper': true, 'labeled-control': true, 'error': this.state.showError})}>
                <label className={this.props.required ? 'required' : null}>{this.props.title}</label>
                <div className='date-time-picker' onClick={this.handleOnClick}>
                    <input
                        data-testid='date'
                        required id='date' type='date'
                        value={moment(this.state.date).format('YYYY-MM-DD')}
                        onChange={this.onDateChange}
                    />
                    <span className='secondary-text'>at</span>
                    <input
                        data-testid='time'
                        id='time' type='time'
                        value={moment(this.state.time).format('HH:mm')}
                        onChange={this.onTimeChange}
                    />
                    <div className='am-pm' onChange={this.onAmPmChange} data-testid='ampm'>
                        <input type='radio' name='ampm' value='AM' checked={this.state.am} /><span className='secondary-text'>AM</span>
                        <input type='radio' name='ampm' value='PM' checked={!this.state.am} /><span className='secondary-text'>PM</span>
                    </div>
                    {this.state.showError &&
                        <ErrorBox errorMessage='Date has to be greater than current date'></ErrorBox>
                    }
                </div>
            </div>
        )
    }
}