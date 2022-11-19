import React from 'react'

import SearchResult from './SearchResult'

export default function ResultContainer({ results }) {
  return (

    <div className="result-container">
    { results.length > 1 ?
        results.map(result => {
            return (
                <SearchResult key={result.title} result={result} />
            )
        })
        : 'No results for your search! :((((('
    }
    </div>
  )
}
