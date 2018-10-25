import React, { Component } from 'react';
import Input from '../../../components/input/Input';
import TextArea from '../../../components/text-area/TextArea';
import Payment from '../../../components/payments/Payment';
import DateTimePicker from '../../../components/date-time-picker/DateTimePicker';
import Select from '../../../components/select/Select';
import resourcesService from '../../../services/resources.service';
import { connect } from 'react-redux';
import {
    setCoordinators,
    setCategories,
    setTitles
} from '../../../store/actions/resources';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import './CreateNewEvent.less'
const classNames = require('classnames');

const maxDescriptionLength = 140;

class CreateNewEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            time: moment(),
            date: moment(),
            timeValid: true,
            formValid: false
        }
    }

    componentDidMount() {
        this.loadCategories();
        this.loadCoordinators();
    }

    loadCategories = () => {
        resourcesService.getCategories().then(result => {
            this.props.setCategories(result);
        });
    }

    loadCoordinators = () => {
        resourcesService.getCoordinators().then(result => {
            const me = [];
            const others = [];
            result.forEach(user => {
                if (user.id == 3) {
                    me.push(user);
                } else {
                    others.push(user);
                }
            })
            this.props.setCoordinators([{
                name: 'Me',
                items: me
            }, {
                name: 'Others',
                items: others
            }]);
        });
    }

    onFormSubmit = async (event) => {
        event.preventDefault();

        const isTitleValid = await this.title.asyncValidate(this.validateTitle);
        const isDescriptionValid = this.description.validate();
        const isDateTimeValid = this.dateTime.validate(this.validateDateTime);
        const isPaymentValid = this.payment.validate();
        const formValid = isTitleValid
            && isDescriptionValid
            && isDateTimeValid
            && isPaymentValid;
        if (formValid) {
            console.log('Form is valid.');
            this.props.history.replace('/new-event/success');
        }
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
        if (value.length && value.indexOf('@') === -1) {
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
                            <div className='with-label'>
                                <Input
                                    ref={(ref) => this.title = ref}
                                    required={true}
                                    title='TITLE'
                                    placeholder='Make it short and clear'
                                    data-testid='title'
                                    defaultValue={this.state.title}
                                />
                            </div>
                            <div className='with-label'>
                                <TextArea
                                    ref={(ref) => this.description = ref}
                                    required={true}
                                    title='DESCRIPTION'
                                    placeholder='Write about your event, be creative'
                                    legend={'Max length' + maxDescriptionLength + 'characters'}
                                    maxLength={maxDescriptionLength}
                                />
                            </div>
                            <div className='with-label'>
                                <Select
                                    title='CATEGORY'
                                    legend='Describes topic and people who should be interested in this event'
                                    defaultOption='Select category'
                                    items={this.props.resources.categories}
                                />
                            </div>
                            <div className='with-label'>
                                <Payment
                                    ref={(ref) => this.payment = ref}
                                    title='PAYMENT'
                                />
                            </div>
                            <div className={classNames('labeled-control', 'with-label')}>
                                <label>REWARD</label>
                                <div className='reward-points'>
                                    <input
                                        type='number'
                                        placeholder='Number'
                                    />
                                    <div className='secondary-text'>reward points for attendance</div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2>Coordinator</h2>
                            <div className='with-label'>
                                <Select
                                    required={true}
                                    title='RESPONSIBLE'
                                    selected='3'
                                    items={this.props.resources.coordinators}
                                />
                            </div>
                            <div className='with-label'>
                                <Input
                                    placeholder='Email'
                                    title='EMAIL'
                                    realTimeValidation={this.validateEmail}
                                    ref={(ref) => this.email = ref}
                                />
                            </div>
                        </section>

                        <section>
                            <h2>When</h2>
                            <div className='with-label'>
                                <DateTimePicker
                                    ref={(ref) => this.dateTime = ref}
                                    required={true}
                                    title='STARTS ON'
                                ></DateTimePicker>
                            </div>
                            <div className={classNames('labeled-control', 'with-label')}>
                                <label>DURATION</label>
                                <div className='duration'>
                                    <input
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
    setCoordinators: payload => dispatch(setCoordinators(payload)),
    setCategories: payload => dispatch(setCategories(payload)),
    setTitles: payload => dispatch(setTitles(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateNewEvent)); 