import { useEffect, useState } from 'react'
import { User } from '../api/basic/types'
import { SignInData, SignUpData } from '../api/basic/auth'

type ValidatorProps = {
  regExp: RegExp
  errorText: string
}

export const inputValidators: Record<string, ValidatorProps> = {
  first_name: {
    regExp: /^([А-ЯЁA-Z][а-яёa-z]+-?[А-ЯЁA-Zа-яёa-z]*)$/,
    errorText: 'Capitalized and no shorter than 2 chars!',
  },
  second_name: {
    regExp: /^([А-ЯЁA-Z][а-яёa-z]+-?[А-ЯЁA-Zа-яёa-z]*)$/,
    errorText: 'Capitalized and no shorter than 2 chars!',
  },
  login: {
    regExp: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
    errorText: '8 to 40 chars, without space and spec chars',
  },
  password: {
    regExp:
      /^(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z\d~!@#$%^&*()\-_=+{};:,<.>]{8,40}$/,
    errorText: '8 to 40 chars: cap letter, spec char and number',
  },
  email: {
    regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorText: 'Enter correct e-mail',
  },
  phone: {
    regExp: /^\+?\d{10,15}$/,
    errorText: '10 to 15 numbers',
  },
}

const useDirty = () => {
  const [isDirty, setDirty] = useState(false)
  const onBlur = () => {
    setDirty(true)
  }
  return {
    isDirty,
    onBlur,
  }
}

const useValid = (bool: boolean, error: string) => {
  const [isValid, setValid] = useState(false)
  const [errorText, setErrorText] = useState('')
  useEffect(() => {
    setValid(bool)
    setErrorText(error)
  }, [bool])

  return { isValid, errorText }
}

export const useValidationForm = (
  data: Record<string, unknown> & (Partial<User> | SignInData | SignUpData)
) => {
  let valid: Record<string, any> = {}
  const [form, setForm] = useState(data)

  for (const key in data) {
    valid = {
      ...valid,
      [key]: {
        valid: useValid(
          inputValidators[key]?.regExp.test(form[key] as string),
          inputValidators[key]?.errorText
        ),
        blur: useDirty(),
      },
    }
  }
  const formIsValid = Object.values(valid).every(
    item => item.valid.isValid === true
  )
  return { valid, setForm, form, formIsValid }
}
