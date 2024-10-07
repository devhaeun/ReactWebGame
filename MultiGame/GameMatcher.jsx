import React, { Component } from 'react';
import NumberBaseball from '../NumberBaseball/NumberBaseball';
import RSP from '../RSP/RSP_class';
import Lotto from '../Lotto/LottoClass';
import { Routes, Route } from 'react-router';

class GameMatcher extends Component {
    render () {
        return (
            <Routes>
                <Route path='number-baseball' element={<NumberBaseball />} />
                <Route path='rock-scissors-paper' element={<RSP />} />
                <Route path='lotto-generator' element={<Lotto />} />
                <Route path='*' element={<div>
                    일치하는 게임이 없습니다.
                </div>} />
            </Routes>
        )
    };
};

export default GameMatcher;