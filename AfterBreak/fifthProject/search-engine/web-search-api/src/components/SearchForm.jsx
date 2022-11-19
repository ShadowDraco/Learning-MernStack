import React, { useState } from 'react'

export default function SearchForm( { setSearchQuery } ) {

  const [newSearchQuery, setNewsearchQuery] = useState('')

  function setNewSearch(e) {
    setNewsearchQuery(e.target.value)
  }

  function submitSearch() {
    console.log('submitting new search query')
    setSearchQuery(newSearchQuery)
  }

  return (
    <div className="search-form">
      <div className="form">
            <input id="search-field" type="search" value={newSearchQuery} onChange={setNewSearch}></input>
            <button className="search-button" onClick={submitSearch}>Search</button>
      </div>
    </div>
  )
}
