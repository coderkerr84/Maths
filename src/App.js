import React, {useState} from 'react';
import Modal from 'react-modal';
import ReactTimerStopwatch from 'react-stopwatch-timer';
import './App.css';
import Question from './Question.js';
import GetMarvelResponse from './MarvelApiCall.js';
import { useEffect } from "react";
import wallpaper from "../src/wallpaper.png";
import earthSuccessImage from "../src/earth_success.jpg";
import earthFailureImage from "../src/earth_failure.jpg";
import skullImage from "../src/skull.png";
import hamburgerImage from "../src/hamburger.png";
import $ from 'jquery';

function App() {
  
  const [timerIsOn, setTimerIsOn] = useState(false);

  const [score, setScore] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback,setFeedback] = useState("Good luck!");
  const [buttonText, setButtonText] = useState("Attack!");
  const [minusCount, setMinusCount] = useState(0);
  const [plusCount, setPlusCount] = useState(0);
  const [timesCount, setTimesCount] = useState(0);
  const [divideCount, setDivideCount] = useState(0);
  const [pleaseChoosenOneOn, setPleaseChooseOneOn] = useState(false);
  const fromTime = new Date(0, 0, 0, 0, 0, 0, 0);

  const [checkboxAdditions, setCheckboxAdditions] = useState(true);
  const [checkboxSubtractions, setCheckboxSubtractions] = useState(true);
  const [checkboxMultiplications, setCheckboxMultiplications] = useState(true);
  const [checkboxDivisions, setCheckboxDivisions] = useState(true);

  const LastLevel = 100;

  const Baddies = [
    1017575,1017303,1017577,1011500,1014986,
    1009609,
    1009368,1010338,1009157,1017328,1010820,
    1009718,1009338,1010918,1017100,1010743,
    1009144,1010929,1009330,1011420,1009148,
    1009149,1010846,1010354,1009150,1014990,
    1010373,1010992,1010802,1009472,1009480,
    1010915,1011128,1017305,1016181,1010978,
    1011358,1010943,1009471,1017099,1015004,

    1011151,1011244,1017300,1010677,1010728,
    
    1010939,1014984,1017299,1009362,1010726, //MODOK
    
    1009511,1009512,1009283,1009281,1010689,
    1009514,1009519,1009522,1014528,1010334,
    1010964,1009526,1010817,1009534,1009189,
    1009276,1009187,1010763,1010735,1011219,
    1011436,1011436,1011390,1009537,1010744,
    1010966,1010344,1011318,1010968,1009555, //Sage
    1009561,1011197,1010950,1010840,1010359,
    1010971,1009573,1011313,1009181,1011065, //Epoch
    1010771,1009297,1011013,1009462,1009653,
    1011233,1010868,1009306,1009309,1010670, //Frog Man
    1009313,1010763,1010832,1011400,1010715,
    1010888,1009371,1009538,1010946,1011071,
    1009378,1009376,1009382,1010760,1009619,
    1009384,1009385,1011014,1009399,1011036
    ];
  // const [selectedBaddy, setSelectedBaddy]=  useState(0);

const Praise = [
  "Correct!",
  "There is NO STOPPING YOU!",
  'Well done!',
  'OMG WOW COOL!',
  'You ROCK!',
  'Keep Going!',
  'BOOGIE WOOGIE WOO!!!',
  'YOU CAN DO IT',
  'Math is kewl (n so are u)',
  'WINNING!',
  ' :-) :-) :-) :-) ',
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
  'SO GOOD',
  'You are better than ICE CREAM!',
  'Winna winna chicken dinna',
  'YOU are the real super hero!!',
  'Mathnificient!',
  'You must be a grown-up!',
  'More brains than an octopus!',
  'Watch out Jr Einstein is about!',
  'ANOTHER ONE BITES THE DUST',
  'Watch out Jr Einstein is about!'];
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background:"rgba(100,120,165,0.8)",
    },
  };

  const questionTypes = ["answerIsMissing","leftIsMissing","rightIsMissing"];

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    if($("input[type=checkbox]:checked").length === 0)
    {
      setPleaseChooseOneOn(true);
      return;
    }
    else
    {
      setPleaseChooseOneOn(false);
    }
    
    PopulateQuestions(); 
    setLevel(level);       
    setIsOpen(false);
  }

  useEffect(()=>{
    document.getElementById("userAnswer").focus();
  });

  const keyDownHandler = event => {
    // console.log('User pressed: ', event.key);

    if (event.key === 'Enter') {
      event.preventDefault();

      // 👇️ your logic here
      ScoreUserEntry();
      setTimerIsOn(true);     
    }
  }


  function GetRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  function ScoreUserEntry()
  {
    if(document.getElementById("userAnswer").value === '') return;
    
    if(document.getElementById("answer").value === document.getElementById("userAnswer").value)
    {
        setScore();
        setLevel(level + 1);
        setFeedback(Praise[GetRandomInt(Praise.length - 1)]);
        // readme: this looks like an anti pattern, old-skool JS because didn't know how to make the Question.userAnswer reset itself. (callbacks?)
        document.getElementById("userAnswer").value = "";        
        PopulateQuestions();
        if(level === LastLevel)
        {
          document.getElementById("Badguy").src = earthSuccessImage;
          // document.getElementById("BadguyName").innerText = "YOU DID IT!" + $(".react-stopwatch-timer__table").lastChild.innerHTML;

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
  } 

  function CreateQuestion(level)
  {
    var question = {leftDigit:0, rightDigit:0, answer:0, operator:""};
    var leftMax = 0;
    var rightMax = 0;

    var questionTypes = [];

    if(checkboxAdditions) 
    {
      questionTypes[questionTypes.length] = "add";
      
    }
    
    if(checkboxDivisions) {
      questionTypes[questionTypes.length] = "divide";
      
    }

    if(checkboxMultiplications) {
      questionTypes[questionTypes.length] = "times";
      
    }

    if(checkboxSubtractions) {
      questionTypes[questionTypes.length] = "minus";
      
    }

    if(questionTypes.length > 0)
    {
      var chosenQType = questionTypes[GetRandomInt(questionTypes.length)];

      if(chosenQType === "add")
      {

        if(level < 10)
        {
          leftMax = 10;
          rightMax = 10;
        }
        else if(level < 50)
        {
          leftMax = 30;
          rightMax = 30;
        }
        else
        {
          leftMax = 100;
          rightMax = 100;
        }

        question.leftDigit = GetRandomInt(leftMax);
        question.rightDigit = GetRandomInt(rightMax);
        question.operator = "+";
        question.answer = question.leftDigit + question.rightDigit;

        setPlusCount(plusCount + 1);
      }
      else if(chosenQType === "divide")
      {

        if(level < 10)
        {
          leftMax = 5;
          rightMax = 5;
        }
        else if(level < 30)
        {
          leftMax = 4;
          rightMax = 8;
        }
        else if(level < 50)
        {
          leftMax = 5;
          rightMax = 10;
        }
        else
        {
          leftMax = 10;
          rightMax = 10;
        }

        var leftTemp = GetRandomInt(leftMax);
        var rightTemp = GetRandomInt(rightMax);

        if(rightTemp === 0)
        {
          // avoid a divide by 0.
          rightTemp = 2;
        }

        var multiple =   leftTemp * rightTemp;

        question.leftDigit = multiple;
        question.rightDigit = rightTemp;
        question.operator = "/";
        question.answer = question.leftDigit / question.rightDigit;

        setDivideCount(divideCount + 1);
      }
      else if(chosenQType === "times")
      {
        
        if(level < 10)
        {
          leftMax = 5;
          rightMax = 5;
        }
        else if(level < 30)
        {
          leftMax = 5;
          rightMax = 10;
        }
        else if(level < 50)
        {
          leftMax = 10;
          rightMax = 10;
        }
        else
        {
          leftMax = 5;
          rightMax = 20;
        }

        question.leftDigit = GetRandomInt(leftMax);
        question.rightDigit = GetRandomInt(rightMax);
        question.operator = "x";
        question.answer = question.leftDigit * question.rightDigit;

        setTimesCount(timesCount + 1);
      }
      else if(chosenQType === "minus")
      {

        if(level < 10)
        {
          leftMax = 10;
          rightMax = 5;
        }
        else if(level < 50)
        {
          leftMax = 20;
          rightMax = 10;
        }
        else
        {
          leftMax = 100;
          rightMax = 100;
        }

        question.leftDigit = GetRandomInt(leftMax);
        question.rightDigit = GetRandomInt(rightMax);
        question.operator = "-";
        question.answer = question.leftDigit - question.rightDigit;

        setMinusCount(minusCount + 1);
      }
      
    }

    return question;
  }

  function PopulateQuestions()
  {
    var q = CreateQuestion(level);
    setJsonQuestion([{
      firstDigit:q.leftDigit,
      secondDigit:q.rightDigit,
      operator:q.operator,
      answer:q.answer
    }]
  );
    return;
  }

  const [jsonQuestions, setJsonQuestion] = useState([
    {
        firstDigit:1,
        secondDigit:1,
        operator:'+',
        answer:2
    }]);

    const handleCheckChange = event => { 
    
      if(event.target.id === "CheckboxAdd")
      {
        setCheckboxAdditions(event.target.checked);
      }
      else if(event.target.id === "CheckboxMinus")
      {
        setCheckboxSubtractions(event.target.checked);
      }
      else if(event.target.id === "CheckboxTimes")
      {
        setCheckboxMultiplications(event.target.checked);
      }
      else if(event.target.id === "CheckboxDivide")
      {
        setCheckboxDivisions(event.target.checked);
      }
      
    }; 
    
  return (
    <div className="App" style={{ backgroundImage: `url(${wallpaper})`,backgroundSize: 'cover', minHeight:1000 }} >
      <header className="App-header">
      {/* <ReactTimerStopwatch isOn={timerIsOn} className="react-stopwatch-timer__table" watchType="stopwatch" displayCricle={true} color="gray" hintColor="red" fromTime={fromTime}/> */}
        <span className="OppositeTopcorner">
          <img id="Hamburger" alt="burger" src={hamburgerImage} width={45} onClick={openModal}/>

        </span>
        
        <span className="Topcorner">      
          <img id="Skull" alt="Skull" src={skullImage} width={45}/>
          <span style={{verticalAlign: 'top'}}>
              {deaths}              
          </span>
        </span>
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
        <h1 className="RoundCounter">Round {level} </h1>            
          <span>
            <img className="Badguy" id="Badguy" alt="Bad hero" src="http://i.annihil.us/u/prod/marvel/i/mg/6/30/4c7c64437b5a1/detail.jpg"/>
            <div id="BadguyName">Solve the sum to beat Mr Hyde!</div>
          </span>
          
          <h2 className={"Round"+GetRandomInt(10)}>{feedback}</h2>
        </p>

        {jsonQuestions.map(q => 
          
          <Question leftDigit={q.firstDigit} rightDigit={q.secondDigit} operator={q.operator} answer={q.answer} questionType={level > 40 ? questionTypes[GetRandomInt(2)] : "answerIsMissing" } callbackMe={keyDownHandler}/>
          
         )
        }
        <button className="InputButton" onClick={() => ScoreUserEntry() }>
          {buttonText}
        </button>

        <Modal         
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Help"
        >
          <div>       
            <p style={{width:"200"}}>
            Include Questions of type:
              <ul style={{listStyle:"none"}}>
                <li><input type="checkbox" id="CheckboxAdd" value="true" checked={checkboxAdditions} onClick={handleCheckChange}/> Additions</li>
                <li><input type="checkbox" id="CheckboxMinus" value="true" checked={checkboxSubtractions} onClick={handleCheckChange}/> Subtractions</li>
                <li><input type="checkbox" id="CheckboxTimes" value="true" checked={checkboxMultiplications} onClick={handleCheckChange}/> Multiplications</li>
                <li><input type="checkbox" id="CheckboxDivide" value="true" checked={checkboxDivisions} onClick={handleCheckChange}/> Divisions</li>
              </ul>
            </p>
            { pleaseChoosenOneOn && <p style={{color:"darkred", fontWeight:"bold"}}>Please choose at least one!</p> }   
          </div>
          <button onClick={closeModal} className="InputButton SmallerButton">save and close</button>
        </Modal>

        {/* <Flame/> */}

      </header>
    </div>
  );
}

export default App;
