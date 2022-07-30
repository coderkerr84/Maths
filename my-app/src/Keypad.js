import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Keypad.css';

const Keypad = (props) => {

    function SaveKeyPress(e,key)
    {
        // alert("hit?" + key + " and " + props.Player);
        if(key != null)
        {
            var currentValue = document.getElementById("userAnswer" + props.Player).value + "";   
            var newValue = "";
            if(key === "<")
            {
                newValue = currentValue.substring(0,currentValue.length-1);
            }
            else
            {
                newValue = currentValue + "" + key;
            }                     
            
            document.getElementById("userAnswer" + props.Player).value = newValue;
            // alert(newValue);
        }
    }  

    return(
        <table className='Keypad'>
            <tr>
                <td className="Key" onClick={ e => SaveKeyPress(e,1)} >1</td>
                <td className="Key" onClick={ e => SaveKeyPress(e,2)}>2</td>
                <td className="Key" onClick={ e => SaveKeyPress(e,3)}>3</td>
            </tr>
            <tr>
                <td className="Key" onClick={ e => SaveKeyPress(e,4)}>4</td>
                <td className="Key" onClick={ e => SaveKeyPress(e,5)}>5</td>
                <td className="Key" onClick={ e => SaveKeyPress(e,6)}>6</td>
            </tr>
            <tr>
                <td className="Key" onClick={ e => SaveKeyPress(e,7)}>7</td>
                <td className="Key" onClick={ e => SaveKeyPress(e,8)}>8</td>
                <td className="Key" onClick={ e => SaveKeyPress(e,9)}>9</td>
            </tr>
            <tr>
                <td className="Key" onClick={ e => SaveKeyPress(e,".")}>.</td>
                <td className="Key" onClick={ e => SaveKeyPress(e,0)}> 0</td>
                <td className="Key" onClick={ e => SaveKeyPress(e,"<")}>{"<"}</td>
            </tr>
        </table>
    );
};    

export default Keypad;