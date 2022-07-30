import { gsap } from "gsap";
import { useEffect } from "react";

const Flame = () => {

    const ring = document.querySelector(".ring");

    useEffect(()=>{
        for (let i = 0; i < 24; i++) {
            const flame = document.createElement("div");
            flame.setAttribute("class", `cap cap${i}`);
          
            const flameUp = document.createElement("img");
            flameUp.setAttribute("class", `up`);
            flameUp.setAttribute("src", `https://assets.codepen.io/489403/firegif_1.gif`);
            flame.appendChild(flameUp);
          
            const flameDown = document.createElement("img");
            flameDown.setAttribute("class", `down`);
            flameDown.setAttribute(
              "src",
              `  https://assets.codepen.io/489403/firedown.gif`
            );
            flame.appendChild(flameDown);
            ring.appendChild(flame);
          };

          button.addEventListener("click", function (e) {
            e.preventDefault();
            active = !active;
          
            if (active) {
              !isTweening() && setActiveTimeline();
            } else {
              !isTweening() && setInactiveTimeline();
            }
          });

    });
    
    const button = document.querySelector("button");
    let active = false;
    
    function setActiveTimeline() {
      let activeTl = gsap.timeline();
      activeTl
        .to("circle", { duration: 1, drawSVG: "50% 50%" })
        .to(
          "button",
          {
            duration: 1,
            boxShadow: `0 0 6px rgba(202, 228, 225, 0.92),
        0 0 30px rgba(202, 228, 225, 0.34), 0 0 12px rgba(238, 69, 6, 0.52),
        0 0 21px rgba(238, 69, 6, 0.92), 0 0 34px rgba(238, 69, 6, 0.78),
        0 0 54px rgba(238, 69, 6, 0.92), inset 0 0 6px rgba(202, 228, 225, 0.92),
        inset 0 0 30px rgba(202, 228, 225, 0.34),
        inset 0 0 12px rgba(238, 69, 6, 0.52), inset 0 0 21px rgba(238, 69, 6, 0.92),
        inset 0 0 34px rgba(238, 69, 6, 0.78), inset 0 0 54px rgba(238, 69, 6, 0.92)`
          },
          "-=1"
        )
    
        .to(
          "#st0",
          {
            duration: 1,
            fill: "#E4836B",
            stroke: "#fff"
          },
          "-=1"
        );
      return activeTl;
    }
    
    function setInactiveTimeline() {
      let inactiveTl = gsap.timeline();
      inactiveTl
        .to("circle", { duration: 1, drawSVG: "0% 100%" })
        .to(
          "button",
          {
            duration: 1,
            boxShadow: `0 0 6px rgba(202, 228, 225, 0),
        0 0 30px rgba(202, 228, 225, 0), 0 0 12px rgba(238, 69, 6, 0),
        0 0 21px rgba(238, 69, 6, 0), 0 0 34px rgba(238, 69, 6, 0),
        0 0 54px rgba(238, 69, 6, 0), inset 0 0 6px rgba(202, 228, 225, 0),
        inset 0 0 30px rgba(202, 228, 225, 0),
        inset 0 0 12px rgba(238, 69, 6, 0), inset 0 0 21px rgba(238, 69, 6, 0),
        inset 0 0 34px rgba(238, 69, 6, 0), inset 0 0 54px rgba(238, 69, 6, 0)`
          },
          "-=1"
        )
        .to(
          "#st0",
          {
            duration: 1,
            fill: "#fff",
            stroke: "#E4836B"
          },
          "-=1"
        );
      return inactiveTl;
    }
    
    function isTweening() {
      return gsap.isTweening("button") || gsap.isTweening("circle");
    }
    

    return(
        <div className="container">
        `  <div className="ring">
            <button>
              <div className="buttonShadow">
                <svg id="flameIcon" xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="-50 -50 152 152" >
                  <path id="st0" d="M43.334 41.697c-3.51 6.78-12.12 8.23-12.49 8.29-.05.01-.11.01-.16.01-.06 0-.12-.01-.18-.02-.04 0-.08-.01-.12-.03a.403.403 0 0 1-.2-.09c-.05-.03-.1-.06-.14-.1a.314.314 0 0 1-.11-.09c-.01-.01-.02-.02-.02-.03-.11-.14-.18-.3-.21-.46-.01-.01-.01-.01-.01-.02-.01-.05-.01-.1-.01-.15 0-.06.01-.12.02-.18 0-.04.02-.09.03-.14.01-.02.01-.03.01-.04.03-.05.05-.1.08-.14.03-.05.06-.1.1-.14.02-.04.06-.08.1-.11l.03-.03c6.82-6.08 5.24-11.77 5.17-12.01-.03-.07-.04-.15-.05-.22-.32-5.02-4.26-10.62-6.74-13.67-.47 4.74-3.4 11.87-4.14 13.6-.19.45-.68.69-1.14.59a1 1 0 0 1-.78-1.02c.06-1.57-1.21-3.66-2.33-5.15-.5 1.26-1.46 3.21-3.28 6.3-.81 1.38-1.28 2.79-1.39 4.17-.39 4.97 2.81 6.8 3.61 7.17.11.05.17.07.18.07.15.06.28.14.38.26.04.03.07.07.1.11.05.09.1.18.12.27.06.15.07.31.04.47-.01.06-.03.12-.05.18-.11.3-.35.52-.64.6-.05.02-.1.03-.15.04-.05.01-.1.01-.15.01-.11 0-.23-.02-.34-.06h-.02c-5.28-2.05-8.75-5.16-10.3-9.24-2.38-6.25.47-12.99 1.8-15.6.67-1.3 1.53-2.62 2.71-4.16 6.51-8.49 8.29-18.02 8.31-18.11.06-.37.33-.67.69-.78.35-.11.74-.01 1.01.25 5.57 5.7 9.92 10.26 12.91 13.56 2.64 2.91 4.77 5.99 6.33 9.18 3.24 6.61 3.72 12.21 1.42 16.66z" /></svg>
              </div>
            </button>
          </div>
  
          <svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="100px" y="0px" width="900px" height="450px" viewBox="-100 -100 900 450" >
            <circle fill="none" cx="350" cy="125" r="120" transform="rotate(-90 350 125)" stroke="#070100" stroke-width="46" />
          </svg>
        </div>
    );

}
export default Flame;
