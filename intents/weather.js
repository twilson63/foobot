const { WEATHER, CLEAR_INTENT } = require('../constants')
const { when, equals } = require('ramda')
const weather = require('../actions/weather')

module.exports = ({ subscribe, dispatch, getState }) => {
  subscribe(() => {
    const { intent } = getState()
    when(equals(WEATHER), () => {
      dispatch({ type: CLEAR_INTENT })
      dispatch(weather)
    })(intent.type)
  })
}
