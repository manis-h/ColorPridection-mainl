import React from 'react';
import { useParams } from 'react-router-dom';

const FreeGame = () => {
  const { name } = useParams();
  console.log(name)

  const gameLinks = {
    'stack-fire-ball': 'https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html',
    'game1': 'https://zv1y2i8p.play.gamezop.com/g/mKZZW9NXW',
    'game2': 'https://zv1y2i8p.play.gamezop.com/g/Umfd7yvMd',
    "frutehop": "https://zv1y2i8p.play.gamezop.com/g/UYiznUAya",
    "numbergame": "https://zv1y2i8p.play.gamezop.com/g/hfPOimYqY",
    "numbergame2": "https://zv1y2i8p.play.gamezop.com/g/PLQTtp9Ei",
    "bubble": "https://zv1y2i8p.play.gamezop.com/g/H1AN6fkwqJ7",
    "ninjafrout": "https://zv1y2i8p.play.gamezop.com/g/rkWfy2pXq0r",
    "solitrain": "https://zv1y2i8p.play.gamezop.com/g/rkPlk2T7qAr",
    "bowlingstar": "https://zv1y2i8p.play.gamezop.com/g/BkdJhTX50B"
    ,"towertwist":"https://zv1y2i8p.play.gamezop.com/g/HJT46GkPcy7",
    "cyber":"https://zv1y2i8p.play.gamezop.com/g/HJXei0j",
    "gunmaster":"https://zv1y2i8p.play.gamezop.com/g/REwFeKcoN",
    "zombi":"https://zv1y2i8p.play.gamezop.com/g/rkxMV8TI6Wg",
    "bouncyball":"https://zv1y2i8p.play.gamezop.com/g/H1Tz6z1Dqym",
    "ipl":"https://zv1y2i8p.play.gamezop.com/g/HJP4afkvqJQ",
    "ramper":"https://zv1y2i8p.play.gamezop.com/g/p7HOjYF4O",
    "pool":"https://zv1y2i8p.play.gamezop.com/g/hgempP8Sc",
    "boulderblast":"https://zv1y2i8p.play.gamezop.com/g/HkTQJhTXqRS",
    "dunkdraw":"https://zv1y2i8p.play.gamezop.com/g/r1xZyhTQ50r",
    "carrom":"https://zv1y2i8p.play.gamezop.com/g/H1Hgyn6XqAS",
    "escaperun":"https://zv1y2i8p.play.gamezop.com/g/Skz4pzkDqyX",







    // Add other game links here
  };

  const gameUrl = gameLinks[name];
  console.log(gameUrl)

  return (
    <main className="mainframe">
      {/* <iframe
        width="100%"
        height="570px"
        src={url}
        frameBorder="0"
        title="Game"
        className="iframe-data"
        loading="lazy" // Adds lazy loading
        allowFullScreen // Allows fullscreen mode
        scrolling="auto" // Adds scrolling if needed
      ></iframe> */}

      {gameUrl ? (
        <iframe src={gameUrl} title="Game" style={{ width: '100%', height: '88vh' }} />
      ) : (
        <div>No game selected</div>
      )}
    </main>
  );
};

export default FreeGame;
