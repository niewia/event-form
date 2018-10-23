import React, { Component } from 'react';

export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        }
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
        this.props.onChange(event)
    }

    render() {
        return (
            <div>
                <input
                    required={this.props.required}
                    id={this.props.id}
                    type={this.props.type || 'text'}
                    defaultValue={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}