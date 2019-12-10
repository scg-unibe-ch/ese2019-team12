export function getEvent (req) {
  return req.context.models.Event
}

export function isAllowedToWrite (userId, event) {
  return Number(userId) === event.userId
}

export function jsonFromEvents (events) {
  if (!events) {
    return []
  }
  const result = []
  for (const event of events) {
    result.push(event.simplified())
  }
  return result
}
