const React = require('react');
const { Component } = React;
const { createRef } = React;
const Try = require('./Try')

function getNumbers() {
    // 숫자 4개 겹치지 않고 랜덤하게 뽑기
    const candidates = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i=0; i<4; i+=1) {
        const chosen = candidates.splice(Math.floor(Math.random()*(9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        value: '',
        result: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        const {value, answer, tries} = this.state;
        if (value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런!' }],
                }
            });
            setTimeout(() => {
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                    result: '',
                });
            }, 5);
            this.inputRef.current.focus();
        } else {
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length>=9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 정답은 ${answer.join(',')}였습니다!`,
                });
                setTimeout(() => {
                    alert('게임을 다시 시작합니다!');
                    this.setState({
                        value: '',
                        answer: getNumbers(),
                        tries: [],
                        result: '',
                    });
                }, 5);
                this.inputRef.current.focus();
            } else {
                for (let i=0; i<4; i+=1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼` }],
                        value: '',
                    }
                });
                this.inputRef.current.focus();
            }
        }
    };
    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        });
    };

    inputRef = createRef();

    render() {
        return (
            <>
                <div>{this.state.result}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v,i) => {
                        return (
                            <Try key={`${i+1}번째 시도: `} try={v.try} result={v.result} />
                        );
                    })}
                </ul>
            </>
        );
    };
};

module.exports = NumberBaseball;