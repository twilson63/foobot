const { INFO, CLEAR_INTENT } = require('../constants')
const { when, equals } = require('ramda')
const info = require('../actions/info')

module.exports = ({ subscribe, dispatch, getState }) => {
  subscribe(() => {
    const { intent } = getState()
    when(equals(INFO), () => {
      //console.log('action', intent)
      dispatch({ type: CLEAR_INTENT })
      dispatch(info(intent))
    })(intent.type)
  })
}
