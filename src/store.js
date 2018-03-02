import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)
