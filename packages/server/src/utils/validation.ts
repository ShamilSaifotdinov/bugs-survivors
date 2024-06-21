import { Request, Response } from 'express'
import { Indexed, isArray, isObject } from './types'

interface ObjValidationScheme {
  type: 'object'
  properties: Indexed<ValidationScheme>
  required?: false
}

interface ArrValidationScheme {
  type: 'array'
  value: ValidationScheme
  required?: false
}

interface NotObjValidationScheme {
  type: 'string' | 'integer' | 'number' | 'boolean'
  required?: false
}

export type ValidationScheme =
  | ObjValidationScheme
  | ArrValidationScheme
  | NotObjValidationScheme

function _validation(
  scheme: ValidationScheme,
  data: unknown,
  isQuery?: boolean
) {
  if (data === undefined || data === null) {
    if (scheme.required !== false) {
      return false
    }
  } else if (scheme.type === 'object') {
    if (!isObject(data)) {
      return false
    }

    const schemeKeys = Object.keys(scheme.properties).filter(
      key =>
        scheme.properties[key].required !== false ||
        (data[key] !== undefined && data[key] !== null)
    )

    const valueKeys = Object.keys(data).filter(
      key => data[key] !== null && data[key] !== undefined
    )

    const uniqKeys = new Set([...valueKeys, ...schemeKeys])
    if (
      !(
        valueKeys.length === uniqKeys.size &&
        schemeKeys.length === uniqKeys.size
      )
    ) {
      return false
    }

    for (const [key, schemeValue] of Object.entries(scheme.properties)) {
      const dataValue = data[key]

      if (!_validation(schemeValue, dataValue, isQuery)) {
        return false
      }
    }
  } else if (scheme.type === 'array') {
    if (!isArray(data)) {
      return false
    }

    for (const dataOfArr of data) {
      if (!_validation(scheme.value, dataOfArr, isQuery)) {
        return false
      }
    }
  } else if (scheme.type === 'string') {
    if (typeof data !== 'string') {
      return false
    }
  } else if (scheme.type === 'boolean') {
    if (typeof data !== 'boolean') {
      return false
    }
  } else if (scheme.type === 'integer' || scheme.type === 'number') {
    if (
      (!isQuery && typeof data !== 'number') ||
      (isQuery && (data === '' || data === null)) ||
      Number.isNaN(data) ||
      (scheme.type === 'integer' && !Number.isInteger(Number(data)))
    ) {
      return false
    }
  } else {
    return false
  }

  return true
}

export default function validation(
  scheme: ValidationScheme,
  type?: 'params' | 'query'
) {
  return function (target: any, propertyKey: string) {
    const originalMethod = target[propertyKey]
    target[propertyKey] = function (
      req: Request,
      res: Response,
      ...args: unknown[]
    ) {
      const data =
        type === 'query' ? req.query : type === 'params' ? req.params : req.body

      if (!_validation(scheme, data, !!type)) {
        res.status(400).json({ reason: 'Invalid request' })
        return
      }

      return originalMethod.apply(this, [req, res, ...args])
    }
  }
}
