import React, { Component } from 'react';
import './Select.less';

export default class Select extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
        this.state.onChange && this.props.onChange(event);
    }

    validate = () => {
        return this.props.items
            && this.props.items.length
            && this.props.value;
    }

    render() {
        return (
            <div className='labeled-control'>
                <label className={this.props.required ? 'required' : null}>{this.props.title}</label>
                <div>
                    <select
                        onChange={this.handleChange} defaultValue={this.state.value || this.props.value}
                        className={(this.state.value || this.props.value) ? 'selected' : null}
                    >
                        {this.props.defaultOption && <option value="" selected disabled hidden>{this.props.defaultOption}</option>}
                        {this.props.items && this.props.items.map(item => {
                            if (item.items) {
                                const items = item.items.map(item => <option key={item.id} className='option' value={item.id}>{item.name}</option>)
                                return <optgroup key={item.name} label={item.name}>{items}</optgroup>
                            } else {
                                return <option className='option' key={item.id} value={item.id}>{item.name}</option>
                            }
                        })}
                    </select>
                    <div className='form-field-legend'>
                        <span>{this.props.legend}</span>
                    </div>
                </div>
            </div>
        )
    }
}