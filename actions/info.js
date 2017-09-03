const fetch = require('isomorphic-fetch')
const { SEND_MSG } = require('../constants')
const { merge, pick } = require('ramda')

module.exports = intent => (dispatch, getState) => {
  //const { intent } = getState()
  fetch('http://numbersapi.com/random/trivia')
    .then(res => res.text())
    .then(msg => {
      console.log('msg: ', msg)
      console.log('intent payload: ', intent)
      dispatch({
        type: SEND_MSG,
        payload: merge(pick(['to', 'from'], intent.payload), {
          body: msg
        })
      })
    })
    .catch(err => console.log('Error with numbers api', err))
}
