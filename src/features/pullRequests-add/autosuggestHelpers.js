import React from 'react'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

const getGithubPullRequestsSuggestions = (githubPullRequests, value) => {
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

const getTasksSuggestions = (tasks, value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? []
    : tasks.filter(
        task => task.title.toLowerCase().slice(0, inputLength) === inputValue
      )
}
const getTaskSuggestionValue = suggestion => `${suggestion._id}`

const getSuggestionValue = suggestion => `${suggestion.title}`

const renderSuggestion = (suggestion, { query }) => {
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

const renderTaskSuggestion = (suggestion, { query }) => {
  const suggestionText = `${suggestion.title} 
    ${suggestion.createdBy.substr(0, 8)} 
    ${suggestion._id}
    `

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

export {
  getGithubPullRequestsSuggestions,
  getTasksSuggestions,
  getSuggestionValue,
  getTaskSuggestionValue,
  renderSuggestion,
  renderTaskSuggestion
}
