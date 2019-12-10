/**
 * Event related helper functions
 *
 * @module helper/event
 */

/**
 * Extract Event from req.context.models
 *
 * @function
 * @memberof module:helper/event
 * @param   {object} req    -   Express request
 * @returns {Event} Event
 */
export function getEvent (req) {
  return req.context.models.Event
}

/**
 * Is the user allowed to delete / update the event?
 *
 * @function
 * @memberof module:helper/event
 * @param   {string}    userId  -   current user userId
 * @param   {Event}     event   -   event to write to
 * @returns {boolean}
 */
export function isAllowedToWrite (userId, event) {
  return Number(userId) === event.userId
}

/**
 * Create a json with given events
 *
 * @function
 * @memberof module:helper/event
 * @param   {Event[]}   events    -   list of events
 * @returns {Object}    JSON
 */
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
