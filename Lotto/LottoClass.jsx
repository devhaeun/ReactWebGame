const React = require('react');
const { Component } = React;

class Lotto extends Component {
    state = {
        winNumbers: [],
        winBalls: [],
        bonus: null,
        redo: false,
    };

    render() {
        return (
            <>
                <div>오늘의 로또 당첨 번호는?</div>
            </>
        );
    };
};

module.exports = Lotto;