import logo from './logo.svg';
import './App.css';
// import './FlameButton.scss';
// import Flame from "./FlameButton.js"
import Question from './Question.js';
import React, {useState} from 'react';
import GetMarvelResponse from './MarvelApiCall.js';
import { useEffect } from "react";
import wallpaper from "../src/wallpaper.png";
import earthSuccessImage from "../src/earth_success.jpg";
import earthFailureImage from "../src/earth_failure.jpg";
import skullImage from "../src/skull.png";

import giftImage1 from "../src/gift1.png";

function App() {
  
  const [score, setScore] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback,setFeedback] = useState("Good luck!");
  const [buttonText, setButtonText] = useState("Attack!");
  const [minusCount, setMinusCount] = useState(0);
  const [plusCount, setPlusCount] = useState(0);
  const [timesCount, setTimesCount] = useState(0);
  const [divideCount, setDivideCount] = useState(0);

  //const Goodies = [1017575,1009351,1009368,1010338,1009157,1009718];
  //const [selectedGoody, setSelectedGoody] = useState(0);
  const LastLevel = 100;

  const Baddies = [
    1017575,1017303,1009368,1010338,1009157,
    1009718,1009338,1010918,1017100,1010743,
    1009144,1010929,1009330,1011420,1009148,
    1009149,1010846,1010354,1009150,1014990,
    1010373,1010992,1010801,1009472,1009480,
    1010915,1011128,1017305,1016181,1010978,
    1011358,1010943,1009471,1017099,1015004,

    1011151,
    
    1010939,
    1009407,1010726, //MODOK
    
    1009511,1009512,
    1009514,1009519,1009522,1014528,1010334,
    1010964,1009526,1010817,1009527,1011238,
    1011436,1010837,1011390,1009537,1010744,
    1010966,1010344,1011117,1010968,1009555, //Sage
    1009558,1010711,1009561,1011197,1010861,
    1010971,1011242,1009573,1011313,1011065, //Epoch
    1009293,1010771,1012378,1009297,1011013,
    1011233, 1010868,1009306,1014993,1010670, //Frog Man
    1009313,1010763,1010832,1011400,1011391,
    1014994,1010888,1009371,1009538,1010946,
    1009378,1009374,1009376,1009382,1010760,
    1009384,1009385,1011014,1009399,1011036
    ];
  // const [selectedBaddy, setSelectedBaddy]=  useState(0);

const Praise = [
  "Correct!",
  "There is NO STOPPING YOU!",
  'Well done!',
  'OMG WOW COOL!',
  'You ROCK!',
  'Keep GOING!',
  'BOOGIE WOOGIE WOO!!!',
  'YOU CAN DO IT',
  'Math is kewl (n so are u)',
  'WINNING!',
  'Stay focussed!',
  'The world depends on you!',
  'Beat the baddies and save the world!',
  'What a run you are on!',
  'Can you win IT ALL??',
  'Nice work young padawan',
  'Do it for New Zealand!',
  'When did you get SO SMART!?',
  'SWEET-AS LIL ONE!',
  'Woo hoo!',
  'SO GOOD LIKE ... CHOCO SOY MILK',
  'You are better than ICE CREAM!',
  'Winna winna chicken dinna',
  'What even ARE you?!',
  'Mathnificient!',
  'You must be a grown-up!',
  'More brains than an octopus!',
  'Watch out Jr Einstein is about!',
  'Watch out Jr Einstein is about!'];

  useEffect(()=>{
    
  });

  function GetRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  function ScoreUserEntry()
  {
    if(document.getElementById("userAnswer").value == '') return;
    if(document.getElementById("answer").value === document.getElementById("userAnswer").value)
    {
        setScore();
        setFeedback(Praise[GetRandomInt(Praise.length - 1)]);
        // readme: this looks like an anti pattern, old-skool JS because didn't know how to make the Question.userAnswer reset itself. (callbacks?)
        document.getElementById("userAnswer").value = "";
        PopulateJsonQuestions();
        if(level === LastLevel)
        {
          document.getElementById("Badguy").src = earthSuccessImage;
          //document.getElementById("BadguyName").innerText = "YOU DID IT - THANK YOU!!";
          setButtonText("!! Choose Your Prize !!");
        }
        else
        {
          GetMarvelResponse(Baddies[level],"Badguy");   
        }
    }
    else
    {
      setFeedback("Unlucky, it is " + document.getElementById("answer").value + "!");
      document.getElementById("Badguy").src = earthFailureImage;
      document.getElementById("BadguyName").innerText = "~~~~~~ BoOoOoOoOoOoM!!!! ~~~~~~~";
      setDeaths(deaths+1);
    }
    document.getElementById("userAnswer").focus();
  } 

  function PopulateJsonQuestions()
  {
    setLevel(level + 1);
    //alert(level);
    var leftDigit = 0;
    var rightDigit = 0;
    var answer = 0 ;
    var operator = "=";

    if(level <= 2)
    {
      // just adds
        leftDigit = GetRandomInt(5);
        rightDigit = GetRandomInt(5);
        operator = "+";
        answer = leftDigit + rightDigit;

    }
    else if(level <= 6)
    {
      // just adds
        leftDigit = GetRandomInt(15);
        rightDigit = GetRandomInt(15);
        operator = "+";
        answer = leftDigit + rightDigit;

    }
    else if(level <= 10)
    {
      // just adds and minuses

      if(GetRandomInt(2))
      {
        leftDigit = GetRandomInt(11);
        rightDigit = GetRandomInt(11);
        operator = "+";
        answer = leftDigit + rightDigit;
      }
      else
      {
        leftDigit = GetRandomInt(13);
        rightDigit = GetRandomInt(5);
        operator = "-";
        answer = leftDigit - rightDigit;
      }

    }
    else if(level > 10 && level < 20)
    {
      if(GetRandomInt(5) < 2)
      {
        leftDigit = GetRandomInt(30);
        rightDigit = GetRandomInt(30);
        operator = "+";
        answer = leftDigit + rightDigit;
      }
      else
      {
        leftDigit = GetRandomInt(16);
        rightDigit = GetRandomInt(5);
        operator = "x";
        answer = leftDigit * rightDigit;
      }

    }
    else if(level >= 20 && level < 50)
    {
      var rand = GetRandomInt(5);
      if(rand < 1)
      {
        leftDigit = GetRandomInt(21);
        rightDigit = GetRandomInt(14);
        operator = "-";
        answer = leftDigit - rightDigit;
      }
      else if(rand < 2)
      {
        leftDigit = GetRandomInt(100);
        rightDigit = GetRandomInt(100);
        operator = "+";
        answer = leftDigit + rightDigit;
      }
      else
      {
        leftDigit = GetRandomInt(8);
        rightDigit = GetRandomInt(8);
        operator = "x";
        answer = leftDigit * rightDigit;
      }

    }
    else
    {
      var rand = GetRandomInt(5);
      if(rand <= 1)
      {
        leftDigit = GetRandomInt(100);
        rightDigit = GetRandomInt(100);
        operator = "-";
        answer = leftDigit - rightDigit;
      }
      else if(rand <= 2)
      {
        leftDigit = GetRandomInt(100);
        rightDigit = GetRandomInt(100);
        operator = "+";
        answer = leftDigit + rightDigit;
      }
      else if(rand <= 3)
      {
        leftDigit = GetRandomInt(10);
        rightDigit = GetRandomInt(15);
        operator = "x";
        answer = leftDigit * rightDigit;
      }
      else
      {
        var leftTemp = GetRandomInt(8);
        var rightTemp = GetRandomInt(12);

        if(rightTemp == 0)
        {
          // avoid a divide by 0.
          rightTemp = 2;
        }

        var multiple =   leftTemp * rightTemp;

        leftDigit = multiple;
        rightDigit = rightTemp;
        operator = "/";
        answer = leftDigit / rightDigit;
      }
    }
    
    if(operator == "+")
    {
      setPlusCount(plusCount + 1);
    }
    else if(operator == "-")
    {
      setMinusCount(minusCount + 1);
    }
    else if(operator == "x")
    {
      setTimesCount(timesCount + 1);
    }
    else if(operator == "/")
    {
      setDivideCount(divideCount + 1);
    }

    setJsonQuestion([{
        firstDigit:leftDigit,
        secondDigit:rightDigit,
        operator:operator,
        answer:answer
      }]
    );
  }

  const [jsonQuestions, setJsonQuestion] = useState([
    {
        firstDigit:1,
        secondDigit:1,
        operator:'+',
        answer:2
    }]);

  return (
    <div className="App" style={{ backgroundImage: `url(${wallpaper})`,backgroundSize: 'cover', minHeight:1000 }} >
      <header className="App-header">
        <span className="Topcorner">
          <img id="Skull" alt="Skull" src={skullImage} width={45}/>
          <span style={{verticalAlign: 'top'}}>
              {deaths}
          </span>
        </span>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <table style={{fontSize: 'xxx-large'}}>
          <tr>
            <td>
            <span className={"Round"+GetRandomInt(10)}>/</span>
            </td>
            <td>
            <span className={"Round"+GetRandomInt(10)}>*</span>
              </td>
              <td>
              <span className={"Round"+GetRandomInt(10)}>-</span>
              </td>
              <td>
              <span className={"Round"+GetRandomInt(10)}>+</span>
              </td>
          </tr>
          <tr>
            <td>
            <span className={"Round"+GetRandomInt(10)}>{divideCount}</span>            
            </td>
            <td>
            <span className={"Round"+GetRandomInt(10)}>{timesCount}</span>            
              </td>
              <td>
              <span className={"Round"+GetRandomInt(10)}>{minusCount}</span>
              </td>
              <td>
              <span className={"Round"+GetRandomInt(10)}>{plusCount}</span>
              </td>
          </tr>
        </table>

        <p style={{margin:'inherit'}}>
        <h1 className="RoundCounter">Round {level}</h1>
          <span>
            <img className="Badguy" id="Badguy" alt="Bad hero" src="http://i.annihil.us/u/prod/marvel/i/mg/6/30/4c7c64437b5a1/detail.jpg"/>
            <div id="BadguyName">Mr Hyde</div>
          </span>
          
          <h2 className={"Round"+GetRandomInt(10)}>{feedback}</h2>
        </p>

        {jsonQuestions.map(q => 
          
          <Question leftDigit={q.firstDigit} rightDigit={q.secondDigit} operator={q.operator} answer={q.answer}/>
          
         )
        }
        <button className="InputButton" onClick={() => ScoreUserEntry() }>
          {buttonText}
        </button>

        {/* <Flame/> */}

      </header>
    </div>
  );
}

export default App;
