import React, { Component } from 'react'
import classNames from 'classnames'

export const calcTheme = submittedWithout => ({
  input: classNames(
    { 'react-autosuggest__input': !submittedWithout },
    { 'error-red': submittedWithout }
  ),
  container: 'react-autosuggest__container',
  containerOpen: 'react-autosuggest__container--open',
  inputOpen: 'react-autosuggest__input--open',
  inputFocused: 'react-autosuggest__input--focused',
  suggestionsContainer: 'react-autosuggest__suggestions-container',
  suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
  suggestionsList: 'react-autosuggest__suggestions-list',
  suggestion: 'react-autosuggest__suggestion',
  suggestionFirst: 'react-autosuggest__suggestion--first',
  suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
  sectionContainer: 'react-autosuggest__section-container',
  sectionContainerFirst: 'react-autosuggest__section-container--first',
  sectionTitle: 'react-autosuggest__section-title'
})
