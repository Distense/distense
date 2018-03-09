import React from 'react'

const getSuggestions = (issues, value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? []
    : issues.filter(
        issue => issue.toLowerCase().slice(0, inputLength) === inputValue
      )
}

const getSuggestionValue = suggestion => suggestion

function renderSuggestion(suggestion, { query, isHighlighted }) {
  return <div className={isHighlighted ? 'bold' : ''}>{suggestion}</div>
}

export { getSuggestions, getSuggestionValue, renderSuggestion }
