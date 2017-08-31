const { promisify } = require('util')
const AWS = require('aws-sdk')
const { replace, merge, when, equals, has, prop } = require('ramda')
const { READY, SEND_MSG } = require('../constants')
const { dispatch } = require('../store')

const lex = new AWS.LexRuntime({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'us-east-1'
})

const postText = promisify(lex.postText.bind(lex))

module.exports = data => async dispatch => {
  const response = await postText({
    botAlias: 'dev',
    botName: 'foobot',
    inputText: data.Body,
    userId: replace('+', '', data.From)
  }).catch(err => console.log('lex error', err))
  // handle fulfillment
  when(equals(READY), () => {
    dispatch({
      type: response.intentName,
      payload: merge(response, {
        to: data.From,
        from: data.To
      })
    })
  })(response.dialogState)

  when(has, () => {
    dispatch({
      type: SEND_MSG,
      payload: {
        to: data.From,
        from: data.To,
        body: response.msg
      }
    })
  })(prop('message', response))
}
