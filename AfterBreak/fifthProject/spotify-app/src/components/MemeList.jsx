import React from 'react'

export default function MemeList( { memes }) {
  return (
    <div className="meme-list">
        {
            memes.map((meme) => {
                return (
                    <div key={meme.id} className='meme-container'>
                        <img src={meme.url}></img>
                    </div>
                )
            })
        }
    </div>
  )
}
