import React from 'react'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

const getSuggestions = (githubPullRequests, value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? []
    : githubPullRequests.filter(
        githubPullRequest =>
          githubPullRequest.title.toLowerCase().slice(0, inputLength) ===
          inputValue
      )
}

const getSuggestionValue = suggestion => `${suggestion.title}`

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.title}`
  const matches = AutosuggestHighlightMatch(suggestionText, query)
  const parts = AutosuggestHighlightParse(suggestionText, matches)
  return (
    <divs>
      {parts.map((part, index) => {
        const className = part.highlight ? 'distense-green bold' : null

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        )
      })}{' '}
      {/*(Issue #{suggestion.number})*/}
    </divs>
  )
}

export { getSuggestions, getSuggestionValue, renderSuggestion }
