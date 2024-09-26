const React = require('react');
const ReactDOM = require('react-dom/client');

const TicTacToe = require('./TicTacToe');


ReactDOM.createRoot(document.querySelector('#root')).render(<TicTacToe />);