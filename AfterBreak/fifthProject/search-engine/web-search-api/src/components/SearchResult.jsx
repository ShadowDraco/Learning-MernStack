import React from 'react'

export default function( { result }) {

    const url = result.url
    const linkName = result.provider.name
    const thumbnail = result.thumbnail
    const title = result.title

  return (
    <div className="search-result">
        <div className="title"> 
            <p>{title}</p>
        </div>
        <div className="thumbnail">
            <a href={result.url}>
              <img src={thumbnail} alt={title}></img>
            </a> 
        </div>
    </div>
  )
}
