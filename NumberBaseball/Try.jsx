const React = require('react');
const { PureComponent } = React;

class Try extends PureComponent {
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