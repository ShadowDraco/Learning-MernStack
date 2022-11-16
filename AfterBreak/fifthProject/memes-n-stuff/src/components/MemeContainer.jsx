import React from 'react'

export default function MemeContainer( { meme, nextMeme, prevMeme }) {

  
  return (
    <div key={meme.id} className="meme-container">
      
      <div class="meme">
        <textarea className="top-text"></textarea>
        <div className="meme-image">
          <img src={meme.url}></img>
        </div>
        <textarea className="bottom-text"></textarea>
      </div>
      
      <div className="buttons">
        <button onClick={prevMeme}>Previous</button>
        <button onClick={nextMeme}>Next</button>
        <button onClick={submitMeme}>Submit</button>
      </div>

    </div>
  )
}
