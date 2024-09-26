const React = require('react');
const Tr = require('./Tr');

const Table = ({ tableData, dispatch }) => {
    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => (
                    <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
                ))}
            </tbody>
        </table>
    );
}

module.exports = Table;