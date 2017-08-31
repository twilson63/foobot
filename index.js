const { dispatch, subscribe, getState } = require('./store')
const { when, equals, prop } = require('ramda')
const parse = require('urlencoded-body-parser')

// action creators
const postText = require('./actions/post-text')

// pure functions
const isSMS = equals(process.env.SMS)

module.exports = (req, res) => {
  // when POST get body
  when(equals('POST'), async () => {
    const data = await parse(req)
    when(isSMS, () => dispatch(postText(data)))(prop('To', data))
  })(prop('method', req))
  return 'OK'
}
