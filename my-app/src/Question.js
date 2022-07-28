import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Question.css';


const Question = ({ leftDigit, rightDigit, operator, answer}) => {

    return(
        <div>
            <span className="Digit">{leftDigit}</span>    
            <span className="Digit">{operator}</span>
            <span className="Digit">{rightDigit}</span>
            <span className="Digit">=</span>
            <span className="Digit"><input type="text" id="userAnswer"className="InputBox" autoComplete="off" /></span>
            <input  type="hidden" id="answer" value={answer}/>
        </div>
    );
};    

export default Question;