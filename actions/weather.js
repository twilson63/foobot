const yql = require('yql')

const { SEND_MSG } = require('../constants')
const { merge, pick, path } = require('ramda')
const forecastPath = ['query', 'results', 'channel', 'item', 'forecast']

module.exports = (dispatch, getState) => {
  const { intent } = getState()
  const sendMsg = msg => {
    dispatch({
      type: SEND_MSG,
      payload: merge(pick(['to', 'from'], intent.payload), {
        body: msg
      })
    })
  }
  const LOCATION = path(['payload', 'slots', 'LOCATION'], intent)
  const query = new YQL(sql(LOCATION))
  query.exec(function(error, response) {
    const forecast = path(forecastPath, response)
    sendMsg(JSON.stringify(forecast))
  })
}

function sql(city) {
  return trim(`
    select *
    from weather.forecast
    where woeid in (
      select woeid
      from geo.places(1)
      where text="${city}"
    )
 `)
}
