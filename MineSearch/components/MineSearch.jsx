import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
};

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result:  '',
    halted: true,
    openedCount: 0,
};

const plantMine = (row, cell, mine) => {
    const candidate = Array(row*cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row*cell-mine) {
        const chosen = candidate.splice(Math.floor(Math.random()*candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i=0; i<row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j=0; j<cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    for (let k=0; k<shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k]%cell;
        data[ver][hor] = CODE.MINE;
    }
    return data;
}

export const START_GAME = 'START_GAME'
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                timer: 0,
                halted: false,
                result: '',
                openedCount: 0,
            };
        case OPEN_CELL: {
            console.log('OPEN_CELL');
            const tableData = [...state.tableData];
            tableData.forEach((row,i) => {
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0;
            const checkAround = (row, cell) => {
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return; // 닫힌 칸만 열기
                }
                if (row<0 || row>tableData.length || cell<0 || cell>tableData[0].length) {
                    return; // 상하좌우 없는 칸 안 열기
                }
                if (checked.includes(row+','+cell)) {
                    return; // 한 번 연 칸 무시
                } else {
                    checked.push(row+','+cell);
                }
                // 주변 칸 지뢰 수 검사
                let around = [
                    tableData[row][cell-1], tableData[row][cell+1],
                ];
                if (tableData[row-1]) {
                    around = around.concat(
                        tableData[row-1][cell-1],
                        tableData[row-1][cell],
                        tableData[row-1][cell+1],
                    );
                }
                if (tableData[row+1]) {
                    around = around.concat(
                        tableData[row+1][cell-1],
                        tableData[row+1][cell],
                        tableData[row+1][cell+1],
                    );
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;

                if (count===0) { // 주변 칸 오픈
                    const near = [];
                    if (row-1>-1) {
                        near.push([row-1, cell-1]);
                        near.push([row-1, cell]);
                        near.push([row-1, cell+1]);
                    }
                    near.push([row, cell-1]);
                    near.push([row, cell+1]);
                    if (row+1 < tableData.length) {
                        near.push([row+1, cell-1]);
                        near.push([row+1, cell]);
                        near.push([row+1, cell+1]);
                    }
                    near.forEach((n) => {
                        if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                }
                if (tableData[row][cell] === CODE.NORMAL) {
                    openedCount+=1; // 내 칸이 닫힌 칸이면  카운트 증가
                }
                tableData[row][cell] = count;
            }
            checkAround(action.row, action.cell);
            let halted = false;
            let result = '';
            if (state.data.row*state.data.cell-state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        };
        case CLICK_MINE: {
            console.log('CLICK_MINE');
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };
        };
        case FLAG_CELL: {
            console.log('FLAG_CELL');
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] = CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        };
        case QUESTION_CELL: {
            console.log('QUESTION_CELL');
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        };
        case NORMALIZE_CELL: {
            console.log('NORMALIZE_CELL');
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        };
        case INCREMENT_TIMER: {
            console.log('INCREMENT_TIMER');
            return {
                ...state,
                timer: state.timer + 1,
            };
        };
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(state);
    const { tableData, timer, result, halted } = state;
    // console.log(tableData);
    
    const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);
    
    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    )
};

export default MineSearch;