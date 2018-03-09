import React from 'react'

const getSuggestions = (issues, value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? []
    : issues.filter(
        issue => issue.title.toLowerCase().slice(0, inputLength) === inputValue
      )
}

const getSuggestionValue = suggestion => `${suggestion.title}`

function renderSuggestion(suggestion, { query, isHighlighted }) {
  return (
    <div className={isHighlighted ? 'bold' : ''}>
      {suggestion.title} (Issue #{suggestion.number})
    </div>
  )
}

export { getSuggestions, getSuggestionValue, renderSuggestion }
