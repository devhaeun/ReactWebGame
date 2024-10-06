// const React = require('react');
// const { useCallback } = require('react');
// const CLICK_CELL = require('./TicTacToe');
import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return;
        }
        // console.log(CLICK_CELL);
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

// module.exports = Td;
export default Td;