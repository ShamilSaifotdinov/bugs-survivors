import { ValidationScheme } from '../../src/utils/validation'

export const get_page: ValidationScheme = {
  type: 'object',
  properties: {
    offset: { type: 'integer' },
    limit: { type: 'integer' },
  },
}

export const user: ValidationScheme = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    login: { type: 'string' },
    avatar: { type: 'string', required: false },
  },
}

export const create_topic: ValidationScheme = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    creator: user,
  },
}

export const get_topic_info: ValidationScheme = {
  type: 'object',
  properties: {
    topicId: { type: 'integer' },
  },
}

export const get_comments: ValidationScheme = {
  type: 'object',
  properties: {
    topicId: { type: 'integer' },
  },
}

export const add_comment: ValidationScheme = {
  type: 'object',
  properties: {
    topicId: { type: 'integer' },
    content: { type: 'string' },
    creator: user,
  },
}

export const add_reply: ValidationScheme = {
  type: 'object',
  properties: {
    commentId: { type: 'integer' },
    replyId: { type: 'integer', required: false },
    content: { type: 'string' },
    creator: user,
  },
}

export const get_replies_query: ValidationScheme = {
  type: 'object',
  properties: {
    ...get_page.properties,
    replyId: {
      type: 'integer',
      required: false,
    },
  },
}

export const get_replies: ValidationScheme = {
  type: 'object',
  properties: {
    commentId: { type: 'integer' },
  },
}

export const update_emoji: ValidationScheme = {
  type: 'object',
  properties: {
    creator: user,
    emoji: { type: 'string' },
  },
}

export const get_emoji: ValidationScheme = {
  type: 'object',
  properties: {
    commentId: { type: 'integer' },
  },
}
