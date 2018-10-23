import React, { Component } from 'react';
import Input from '../../components/input/Input';
import moment from 'moment';

const maxDescriptionLength = 140;

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            time: moment(),
            date: moment(),
            timeValid: true,
            formValid: false
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const selectedDate = new moment(this.state.date).set({
            hour: this.state.time.hour(),
            minutes: this.state.time.minutes()
        })
        if (selectedDate.isBefore(moment())) {
            return false;
        }
    }

    onFormChange = () => {
        this.setState({
            formValid: this.state.title.length
                && this.state.description.length
                && this.state.dateTimeValid
        })
    }

    onTitleChanged = (event) => {
        this.setState({ title: event.target.value }, this.onFormChange );
    }

    descriptionChanged = (event) => {
        this.setState({ description: event.target.value }, this.onFormChange)
    }

    onDateChange = (event) => {
        const newDate = moment(event.target.value);
        const selectedDate = new moment(newDate).set({
            hour: this.state.time.hour(),
            minutes: this.state.time.minutes()
        })
        this.setState({ 
            date: newDate,
            dateTimeValid: selectedDate.isAfter(moment())
         }, this.onFormChange)
    }

    onTimeChange = (event) => {
        const newTime = moment(event.target.value, 'HH:mm');
        const selectedDate = new moment(this.state.date).set({
            hour: newTime.hour(),
            minutes: newTime.minutes()
        })
        this.setState({
            time: newTime,
            dateTimeValid: selectedDate.isAfter(moment())
        }, this.onFormChange)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <section>
                        <h2>About</h2>
                        <div className='.with-label'>
                            <label htmlFor='title'>TITLE</label>
                            <Input required id='title' type="text" defaultValue={this.state.title} onChange={this.onTitleChanged} />
                        </div>
                        <div className='.with-label'>
                            <label htmlFor='description'>DESCRIPTION</label>
                            <textarea
                                required
                                data-testid='description'
                                id='description'
                                maxLength={maxDescriptionLength}
                                defaultValue={this.state.description}
                                onChange={this.descriptionChanged}
                            ></textarea>
                            <span data-testid='description-length'>{this.state.description.length}/{maxDescriptionLength}</span>
                        </div>
                        <div className='.with-label'>
                            <label>CATEGORY</label>
                            <select>
                                <option value="volvo">pull from api</option>
                            </select>
                        </div>
                        <div className='.with-label'>
                            <label>PAYMENT</label>
                            <input type="radio" name="paid" value="false" defaultChecked /> Free event
                            <input type="radio" name="paid" value="true" /> Paid event
                        </div>
                        <div className='.with-label'>
                            <label>PAYMENT</label>
                            <input type='number' min={10} max={100} />
                        </div>
                    </section>

                    <section>
                        <h2>Coordinator</h2>
                        <div className='.with-label'>
                            <label>RESPONSIBLE</label>
                            <select data-testid='responsible'>
                                <option value="volvo">pull from api</option>
                            </select>
                        </div>
                    </section>

                    <section>
                        <h2>When</h2>
                        <div className='.with-label'>
                            <label htmlFor='date'>STARTS ON</label>
                            <input
                                required id='date' type='date'
                                value={moment(this.state.date).format('YYYY-MM-DD')}
                                onChange={this.onDateChange}
                            />
                            <span>at</span>
                            <input
                                id='time' type='time'
                                value={moment(this.state.time).format("HH:mm")}
                                min="00:00"
                                max="12:00"
                                onChange={this.onTimeChange}
                            />
                            <input type="radio" name="ampm" value="AM" defaultChecked /> AM
                            <input type="radio" name="ampm" value="PM" /> PM
                        </div>
                    </section>

                    <button disabled={!this.state.formValid} type="submit" data-testid='submit'>PUBLISH EVENT</button>
                </form>
            </div>
        )
    }
}