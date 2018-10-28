import React, { Component } from 'react';
import Input from '../../../components/input/Input';
import TextArea from '../../../components/text-area/TextArea';
import Payment from '../../../components/payments/Payment';
import DateTimePicker from '../../../components/date-time-picker/DateTimePicker';
import Select from '../../../components/select/Select';
import resourcesService from '../../../services/resources.service';
import { connect } from 'react-redux';
import {
    fetchCoordinators,
    fetchCategories
} from '../../../store/actions/resources';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import './CreateNewEvent.less'
const classNames = require('classnames');

const maxDescriptionLength = 140;

class CreateNewEvent extends Component {

    constructor(props) {
        super(props);
        this.form = {
        }
    }

    componentDidMount() {
        this.loadCategories();
        this.loadCoordinators();
    }

    loadCategories = () => {
        this.props.fetchCategories();
    }

    loadCoordinators = () => {
        this.props.fetchCoordinators();
    }

    onFormSubmit = async (event) => {
        event.preventDefault();
        const form = this.form;

        const isTitleValid = await form.title.asyncValidate(this.validateTitle);
        const isDescriptionValid = form.description.validate();
        const isDateTimeValid = form.dateTime.validate(this.validateDateTime);
        const isCoordinatorValid = form.coordinator.validate();

        const formValid = isTitleValid
            && isDescriptionValid
            && isDateTimeValid
            && isCoordinatorValid;

        if (formValid) {
            this.onFormValid(form)
        } 
    }

    onFormValid = (form) => {
        const formData = {
            title: form.title.state.value,
            description: form.description.state.value,
            category_id: +form.category.state.value,
            paid_event: form.payment.state.isPaid,
            eventFee: form.payment.state.isPaid ? form.payment.state.fee : 0,
            reward: +form.reward.value,
            date: form.dateTime.state.value,
            duration: (+form.duration.value * 60 * 60),
            coordinator: {
                email: form.email.state.value,
                id: form.coordinator.state.value
            }
        }
        console.log(formData);
        this.props.history.replace('/new-event/success');
    }

    validateTitle(title) {
        if (title.length === 0) return Promise.resolve('Title cannot be empty');
        return resourcesService.getTitles().then(events => {
            let errorMsg = ''
            if (events.filter(event => event.title === title).length !== 0) {
                errorMsg = 'Title has to be unique';
            }
            return errorMsg;
        }).catch(e => 'Unknown error')
    }

    validateDateTime(date) {
        const selectedDate = new moment(date);
        return selectedDate.isAfter(moment());
    }

    onFormChange = () => {
        this.setState({
            formValid: true
        })
    }

    validateEmail = (value) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        if (!emailRegex.test(value)) {
            return 'Valid email required';
        }
        return ''
    }

    render() {
        return (
            <div className='form-wrapper'>
                <form onSubmit={this.onFormSubmit}>
                    <div className='form-body'>
                        <section>
                            <h2>About</h2>
                            <div>
                                <Input
                                    ref={(ref) => this.form.title = ref}
                                    required={true}
                                    title='TITLE'
                                    placeholder='Make it short and clear'
                                    defaultValue={this.form.title}
                                />
                            </div>
                            <div>
                                <TextArea
                                    ref={(ref) => this.form.description = ref}
                                    required={true}
                                    title='DESCRIPTION'
                                    placeholder='Write about your event, be creative'
                                    legend={'Max length' + maxDescriptionLength + 'characters'}
                                    maxLength={maxDescriptionLength}
                                />
                            </div>
                            <div>
                                <Select
                                    ref={(ref) => this.form.category = ref}
                                    title='CATEGORY'
                                    legend='Describes topic and people who should be interested in this event'
                                    defaultOption='Select category'
                                    items={this.props.resources.categories}
                                />
                            </div>
                            <div>
                                <Payment
                                    ref={(ref) => this.form.payment = ref}
                                    title='PAYMENT'
                                />
                            </div>
                            <div className={classNames('labeled-control', 'with-label')}>
                                <label>REWARD</label>
                                <div className='reward-points'>
                                    <input
                                        ref={(ref) => this.form.reward = ref}
                                        type='number'
                                        placeholder='Number'
                                    />
                                    <div className='secondary-text'>reward points for attendance</div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2>Coordinator</h2>
                            <div>
                                <Select
                                    ref={(ref) => this.form.coordinator = ref}
                                    required={true}
                                    title='RESPONSIBLE'
                                    value='3'
                                    items={this.props.resources.coordinators}
                                />
                            </div>
                            <div>
                                <Input
                                    ref={(ref) => this.form.email = ref}
                                    placeholder='Email'
                                    title='EMAIL'
                                    realTimeValidation={this.validateEmail}
                                    ref={(ref) => this.form.email = ref}
                                />
                            </div>
                        </section>

                        <section>
                            <h2>When</h2>
                            <div>
                                <DateTimePicker
                                    ref={(ref) => this.form.dateTime = ref}
                                    required={true}
                                    title='STARTS ON'
                                ></DateTimePicker>
                            </div>
                            <div className={classNames('labeled-control', 'with-label')}>
                                <label>DURATION</label>
                                <div className='duration'>
                                    <input
                                        ref={(ref) => this.form.duration = ref}
                                        placeholder='Number'
                                        type='number'
                                    />
                                    <div className='secondary-text'>hour</div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className='submit-wrapper'>
                        <button type='submit' data-testid='submit'>PUBLISH EVENT</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { resources: state.resources };
};

const mapDispatchToProps = dispatch => ({
    fetchCoordinators: payload => dispatch(fetchCoordinators(payload)),
    fetchCategories: payload => dispatch(fetchCategories(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateNewEvent)); 