const { createStore, combineReducers, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default
const {
  GREETING,
  SEND_MSG,
  CLEAR_MSG,
  CLEAR_INTENT,
  INFO
} = require('./constants')
const { cond, T, always, equals } = require('ramda')

const store = createStore(
  combineReducers({
    app,
    intent,
    msg
  }),
  applyMiddleware(thunk)
)

module.exports = store

// register intents
require('./intents/greeting')(store)
require('./intents/info')(store)
require('./intents/weather')(store)

// register outbound services
require('./outbound/sms')(store)

// const T = v => true

function msg(state = {}, action) {
  return cond([
    [equals(SEND_MSG), always(action.payload)],
    [equals(CLEAR_MSG), always({})],
    [T, always(state)]
  ])(action.type)
}

function intent(state = {}, action) {
  return cond([
    [equals(GREETING), always(action)],
    [equals(INFO), always(action)],
    [equals(CLEAR_INTENT), always({})],
    [T, always(state)]
  ])(action.type)
}

function app(state = {}, action) {
  return state
}
