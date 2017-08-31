const fetch = require('isomorphic-fetch')
const { SEND_MSG } = require('../constants')
const { merge, pick } = require('ramda')

module.exports = (dispatch, getState) => {
  const { intent } = getState()
  fetch('http://numbersapi.com/random/trivia')
    .then(res => res.text())
    .then(msg => {
      dispatch({
        type: SEND_MSG,
        payload: merge(pick(['to', 'from'], intent.payload), {
          body: msg
        })
      })
    })
}
