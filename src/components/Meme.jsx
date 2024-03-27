import 'react';
import { useState, useEffect } from 'react';

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((apiData) => setAllMemes(apiData.data.memes));
  }, []);

  function handleInputText(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * (allMemes.length + 1));
    const randomMemeImageUrl = allMemes[randomNumber].url;

    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: randomMemeImageUrl,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          id="top-text"
          className="form--input"
          type="text"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleInputText}
        ></input>
        <input
          id="bottom-text"
          className="form--input"
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleInputText}
        ></input>

        <button onClick={getMemeImage} className="form--button">
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
