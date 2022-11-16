import React from 'react'

export default function MemeContainer( { meme, nextMeme, prevMeme, submitMeme, handleTopText, handleBottomText, topText, bottomText, saveMemes }) {

  return (
    <div key={meme.id} className="meme-container">
      
      <div className="meme">
        
        { handleTopText ? <textarea key="topText" className="top-text" onChange={handleTopText} value={topText}></textarea> : '' }
        <div className="meme-image">
          <img src={meme.url}></img>
        </div> 
        { handleBottomText ? <textarea key="bottomText" className="bottom-text" onChange={handleBottomText} value={bottomText}></textarea>  : '' }
      </div>
      
      <div className="buttons">
        <button onClick={prevMeme}>Previous</button>
        <button onClick={nextMeme}>Next</button>
        { submitMeme ? <button onClick={submitMeme}>Submit</button> : ''} 
        { saveMemes ? <button onClick={saveMemes}>Save!</button> : ''}
      </div>

    </div>
  )
}
