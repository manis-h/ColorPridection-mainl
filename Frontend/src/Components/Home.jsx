import React, { useState } from 'react';
import img1 from "../Assets/gameimage/stack-fire-ball.webp";
import img2 from "../Assets/gameimage/fruitfista.webp";
import img3 from "../Assets/gameimage/viking.png";
import img4 from "../Assets/gameimage/bubble.jpg";
import img5 from "../Assets/gameimage/numbergame2.jpg";
import img6 from "../Assets/gameimage/numbergame.webp";
import img7 from "../Assets/gameimage/froutchope.jpg";


import img8 from "../Assets/gameimage/ninjafrout.jpg";
import img9 from "../Assets/gameimage/boulder.jpg";
import img10 from "../Assets/gameimage/bouncy.jpg";
import img11 from "../Assets/gameimage/bowlingstar.jpg";
import img12 from "../Assets/gameimage/carrom.jpg";
import img13 from "../Assets/gameimage/cyber.jpg";
import img14 from "../Assets/gameimage/dunkdraw.jpg";
import img15 from "../Assets/gameimage/escaperun.jpg";
import img16 from "../Assets/gameimage/gunmaster.jpg";
import img17 from "../Assets/gameimage/ipl.jpg";
import img18 from "../Assets/gameimage/pool.jpg";
import img19 from "../Assets/gameimage/rampage.jpg";
import img20 from "../Assets/gameimage/solitrain.jpg";
import img21 from "../Assets/gameimage/towertwist.jpg";
import img22 from "../Assets/gameimage/zombi.jpg";


import mint1 from "../Assets/gameimage/1mint.png"
import mint5 from "../Assets/gameimage/5mint.png"


import { Link } from 'react-router-dom';
import { Slider } from './Slider';
import Footer from './Footer';

export const Home = () => {
  const [loading, setLoading] = useState(false); // Loading state

  const Data1 = [
    {
      url: img1,
      link: 'stack-fire-ball',
    },
    {
      url: img2,
      link: "game1"

    }
    ,
    {
      url: img7,
      link: "frutehop"
    },
    {
      url: img3,
      link: "game2"
    }
    ,
    {
      url: img6
      , link: "numbergame"
    },
    {
      url: img8,
      link: 'ninjafrout',
    }, {
      url: img4
      , link: "bubble"
    },
    {
      url: img5,
      link: "numbergame2"
    },
    {
      url: img9,
      link: "boulderblast"

    },
    {
      url: img10,
      link: "bouncyball"
    },
    {
      url: img11
      , link: "pool"
    },
    {
      url: img12,
      link: "carrom"
    },
    {
      url: img13
      , link: "cyber"
    },
    {
      url: img14,
      link: "dunkdraw"
    },
    {
      url: img15,
      link: 'escaperun',
    },
    {
      url: img16,
      link: "gunmaster"

    },
    {
      url: img17,
      link: "ipl"
    },
    {
      url: img18
      , link: "pool"
    },
    {
      url: img19,
      link: "ramper"
    },
    {
      url: img20
      , link: "solitrain"
    },
    {
      url: img21,
      link: "towertwist"
    },
    {
      url: img22,
      link: "zombi"
    }
  ];

  return (
    <div >
      <Slider />



      <div className="Live-Casino mt-3">
        <div className="container-lg">
        <div className="PagesHeading">
              <h2>Our Games</h2>
            </div>
          {loading ? (
            <div>Loading...</div> // Display loading indicator
          ) : (
            <>
            <div className="listings">
              
              <div className="row">
               
                    <div  className="col-6 col-md-4 mb-4">
                    <Link to="/betpage">
                        <div className="shadow rounded position-relative img-container1">
                          <img
                            src={mint1}
                            className="img-fluid w-100"
                            alt=""
                            loading="lazy"
                          />
                        </div>
                        </Link>

                    
                    </div>

                    <div  className="col-6 col-md-4 mb-4">
                    <Link to="/betpagefive">
                    
                        <div className="shadow rounded position-relative img-container1">
                          <img
                            src={mint5}
                            className="img-fluid w-100"
                            alt=""
                            loading="lazy"
                          />
                        </div>
                        </Link>
                        
                    
                    </div>
                 
              </div>


              <div className="PagesHeading">
              <h2>Play Games Free</h2>
            </div>
            </div>
            <div className="listings">
              <div className="row">
                {Data1 &&
                  Data1.map((item, index) => (
                    <div key={index} className="col-6 col-md-3 mb-4">
                      <Link

                        to={`/game/${item.link}`}
                      >
                        <div className="shadow rounded position-relative img-container">
                          <img
                            src={item.url}
                            className="img-fluid w-100"
                            alt=""
                            loading="lazy"
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            </>
          )}
        </div>
      </div>


      <Footer/>
    </div>
  );
}


