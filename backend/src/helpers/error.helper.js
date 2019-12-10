export function sendNotFoundError (res) {
  res.statusCode = 404
  res.send({ message: 'not found' })
}

export function sendInternalError (res, err) {
  console.log('Internal Error: ', err)
  res.statusCode = 500
  res.send()
}

export function sendForbiddenError (res) {
  res.statusCode = 403
  res.send({ AuthorizationError: 'Insufficient privileges' })
}

export function handleSequelizeErrors (res, err) {
  const msg = {}
  err.errors.forEach(e => {
    const errorType = e.type

    if (errorType !== 'Validation error' && errorType !== 'unique violation') {
      console.log('Internal Error: ', e)
    }
    if (msg[e.type] === undefined) {
      msg[e.type] = []
    }
    msg[e.type].push(e.message)
  })
  res.send(msg)
}
