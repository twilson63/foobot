const { is, when } = require('ramda')
const { CLEAR_MSG } = require('../constants')
const Twilio = require('twilio')

const twilio = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

module.exports = ({ subscribe, getState, dispatch }) => {
  subscribe(() => {
    const { msg } = getState()
    if (msg && msg.body) {
      dispatch({ type: CLEAR_MSG })
      twilio.messages.create(msg)

      console.log(msg)
    }
  })
}
