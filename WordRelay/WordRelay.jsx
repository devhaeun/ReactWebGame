const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('고양이');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmtForm = (e) => {
        e.preventDefault();
        if (word[word.length-1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmtForm}>
                <input ref={inputRef} type="text"
                value={value} onChange={(e) => setValue(e.currentTarget.value)}
                />
                <button>클릭!!</button>
            </form>
            <div>{result}</div>
        </>
    )
}

module.exports = WordRelay;