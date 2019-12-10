import { sendInternalError } from '../helpers/error.helper'

export function getTag (req) {
  return req.context.models.Tag
}

export async function findOrCreateTags (req, tags) {
  const Tag = getTag(req)

  if (!tags || tags === undefined) {
    return
  }
  for (const tag of tags) {
    await Tag.findOrCreate({ where: { name: tag } })
  }
}

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
