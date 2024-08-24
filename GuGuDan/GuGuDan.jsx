const React = require('react');
const { Component } = React;

const GuGuDan = () => {
    const [first, setFirst] = React.useState(Math.ceil(Math.random()*9));
    const [second, setSecond] = React.useState(Math.ceil(Math.random()*9));
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');
    const inputRef = React.useRef(null);

    const onSubmit = (e) => {
        e.preventDefault()
        if (parseInt(value) === first * second) {
            setFirst(Math.ceil(Math.random()*9));
            setSecond(Math.ceil(Math.random()*9));
            setValue('');
            setResult((prevResult)=>{
                return '정답: '+ value;
            });
            inputRef.current.focus();
        } else {
            setValue('');
            setResult('땡!');
            inputRef.current.focus();
        }
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="number" value={value} onChange={onChange} />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
};

module.exports = GuGuDan;