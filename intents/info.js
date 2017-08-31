const { INFO, CLEAR_INTENT } = require('../constants')
const { when, equals } = require('ramda')
const info = require('../actions/info')

module.exports = ({ subscribe, dispatch, getState }) => {
  subscribe(() => {
    const { intent } = getState()
    when(equals(INFO), () => {
      dispatch({ type: CLEAR_INTENT })
      dispatch(info)
    })(intent.type)
  })
}
