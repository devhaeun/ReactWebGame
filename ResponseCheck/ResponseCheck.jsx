const React = require('react');
const { useState, useRef } = React;

const ResponseCheck = () => {
    const [state, setState] = React.useState('waiting');
    const [message, setMessage] = React.useState('시작하려면 클릭하세요.');
    const [result, setResult] = React.useState([]);
    const startTime = React.useRef(0);
    const endTime = React.useRef(0);
    const timeout = React.useRef(null);

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random()*1000)+2000);
        } else if (state === 'ready') {
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };
    return (
        <>
            <div
            id="screen"
            className={state}
            onClick={onClickScreen}
            >
                {message}
            </div>
            <div>평균 시간: {result.length === 0
                ? <span>0</span>
                : <span>{result.reduce((a,c) => a+c) / result.length}ms</span>}
            </div>
        </>
    );
};

module.exports = ResponseCheck;