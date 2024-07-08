import { ValidationScheme } from '../../src/utils/validation'

export const get_page: ValidationScheme = {
  type: 'object',
  properties: {
    offset: { type: 'integer' },
    limit: { type: 'integer' },
  },
}

export const _user: ValidationScheme = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    first_name: { type: 'string', required: false },
    second_name: { type: 'string', required: false },
    display_name: { type: 'string', required: false },
    login: { type: 'string' },
    email: { type: 'string', required: false },
    phone: { type: 'string', required: false },
    avatar: { type: 'string', required: false },
  },
}

// Topic

export const create_topic: ValidationScheme = {
  type: 'object',
  properties: {
    _user,
    name: { type: 'string' },
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

// Comments

export const add_comment: ValidationScheme = {
  type: 'object',
  properties: {
    _user,
    topicId: { type: 'integer' },
    content: { type: 'string' },
  },
}

export const add_reply: ValidationScheme = {
  type: 'object',
  properties: {
    _user,
    commentId: { type: 'integer' },
    replyId: { type: 'integer', required: false },
    content: { type: 'string' },
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

// Emoji

export const update_emoji: ValidationScheme = {
  type: 'object',
  properties: {
    _user,
    emoji: { type: 'string' },
  },
}

export const get_emoji: ValidationScheme = {
  type: 'object',
  properties: {
    commentId: { type: 'integer' },
  },
}

// Theme

export const get_theme: ValidationScheme = {
  type: 'object',
  properties: {
    _user,
  },
}

export const change_theme: ValidationScheme = {
  type: 'object',
  properties: {
    _user,
    theme: { type: 'string' },
  },
}
