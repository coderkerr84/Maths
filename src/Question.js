import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Question.css';


const Question = ({ leftDigit, rightDigit, operator, answer,callbackMe, questionType}) => {

        const renderAuthButton = () => {
    
            switch (questionType) {
                case "answerIsMissing":
                  return <div>
                    <span className="Digit">{leftDigit}</span>    
                    <span className="Digit">{operator}</span>
                    <span className="Digit">{rightDigit}</span>
                    <span className="Digit">=</span>
                    <span className="Digit"><input type="text" id="userAnswer"className="InputBox" autoComplete="off" onKeyDown={callbackMe}/></span>
                    <input  type="hidden" id="answer" value={answer}/>
                  </div>; 
                case "leftIsMissing":
                  return <div>
                        <span className="Digit"><input type="text" id="userAnswer"className="InputBox" autoComplete="off" onKeyDown={callbackMe}/></span>  
                        <span className="Digit">{operator}</span>
                        <span className="Digit">{rightDigit}</span>
                        <span className="Digit">=</span>
                        <span className="Digit">{answer}</span>
                        <input  type="hidden" id="answer" value={leftDigit}/>  
                    </div>;
                case "rightIsMissing":
                    return <div>
                        <span className="Digit">{leftDigit}</span>
                        <span className="Digit">{operator}</span>
                        <span className="Digit"><input type="text" id="userAnswer"className="InputBox" autoComplete="off" onKeyDown={callbackMe}/></span>                                                  
                        <span className="Digit">=</span>
                        <span className="Digit">{answer}</span>
                        <input  type="hidden" id="answer" value={rightDigit}/>  
                    </div>;
                default:
                  return null; 
    
        }
    }

    return(
    
            <span>
                {renderAuthButton()}                
            </span>        

    );
}    

export default Question;