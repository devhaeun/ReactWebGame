const React = require('react');

const ResponseCheck = () => {
    const [screen, setScreen] = React.useState('ready');
    const [message, setMessage] = React.useState('시작하려면 클릭하세요.');
    const [time, setTime] = React.useState('');

    return (
        <>
            <div>
                <div>{message}</div>
            </div>
            <div>평균 시간: </div>
        </>
    );
};

module.exports = ResponseCheck;