import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import GameMatcher from "./GameMatcher";

const MultiGame = () => {
    return (
        <BrowserRouter>
            <div>
                <Link to='/game/number-baseball'>숫자야구</Link>
                &nbsp;
                <Link to='/game/rock-scissors-paper'>가위바위보</Link>
                &nbsp;
                <Link to='/game/lotto-generator'>로또생성기</Link>
                &nbsp;
                <Link to='/game/index'>게임 매쳐</Link>
            </div>
            <div>
                <Routes>
                    <Route path='/game/*' element={<GameMatcher />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default MultiGame;