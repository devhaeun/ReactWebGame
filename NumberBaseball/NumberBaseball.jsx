const React = require('react');
const { Component } = React;

function getNumbers() {
    // 숫자 4개 겹치지 않고 랜덤하게 뽑기
}

class NumberBaseball extends Component {
    state = {
        value: '',
        result: '',
        answer: getNumbers(),
    };

    render() {
        return (
            <>
                <div>임시</div>
            </>
        );
    };
};

module.exports = NumberBaseball;