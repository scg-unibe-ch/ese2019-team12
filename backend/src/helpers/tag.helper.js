import { sendInternalError } from '../helpers/error.helper'

/**
 * Tag related helper functions
 *
 * @module helper/tag
 */

/**
 * Extract Tag from req.context.models
 *
 * @function
 * @memberof module:helper/tag
 * @param   {object} req   -   Express request
 * @returns {Object} Tag
 */
export function getTag (req) {
  return req.context.models.Tag
}

/**
 * Find or create given tags
 *
 * @function
 * @memberof module:helper/tag
 * @param   {object} req   -   Express request
 * @param   {object} tags  -   json with tags
 */
export async function findOrCreateTags (req, tags) {
  const Tag = getTag(req)

  if (!tags || tags === undefined) {
    return
  }
  for (const tag of tags) {
    await Tag.findOrCreate({ where: { name: tag } })
  }
}

/**
 * update tags of given service and sends reply to client
 *
 * @function
 * @memberof module:helper/tag
 * @param   {Service} service   -   service object
 * @param   {object} tags       -   json with tags
 * @param   {object} req        -   Express request
 * @param   {object} res        -   Express response
 */
export function updateTags (service, tags, req, res) {
  findOrCreateTags(req, tags).then(() => {
    service.getTags().then(t => {
      service.removeTags(t)
      service.setTags(tags)
      service.save().then((s) => {
        res.status(202).send(s)
      }).catch(err => {
        sendInternalError(res, err)
      })
    }).catch(err => {
      sendInternalError(res, err)
    })
  }).catch(err => {
    sendInternalError(res, err)
  })
}
