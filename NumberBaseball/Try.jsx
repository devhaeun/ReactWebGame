const React = require('react');
const { Component } = React;

class Try extends Component {
    render() {
        return (
            <li>
                <div>{this.props.try}</div>
                <div>{this.props.result}</div>
            </li>
        );
    }
}

module.exports = Try;