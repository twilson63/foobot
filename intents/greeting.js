const { GREETING, SEND_MSG, CLEAR_INTENT } = require('../constants')
const { cond, equals, pick, merge } = require('ramda')

module.exports = ({ subscribe, dispatch, getState }) => {
  subscribe(() => {
    const { intent } = getState()
    cond([
      [
        equals(GREETING),
        () => {
          dispatch({
            type: CLEAR_INTENT
          })
          dispatch({
            type: SEND_MSG,
            payload: merge(pick(['to', 'from'], intent.payload), {
              body: greeting()
            })
          })
        }
      ]
    ])(intent.type)
  })
}

function greeting() {
  return `Hello There, what would you like to chat about?`
}
