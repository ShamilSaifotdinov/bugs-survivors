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
    errorText: 'С большой буквы и не короче 2 символов!',
  },
  second_name: {
    regExp: /^([А-ЯЁA-Z][а-яёa-z]+-?[А-ЯЁA-Zа-яёa-z]*)$/,
    errorText: 'С большой буквы и не короче 2 символов!',
  },
  login: {
    regExp: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
    errorText: 'От 3 до 20 символов, без пробелов и спецсимволов!',
  },
  password: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    errorText: 'От 8 до 40 символом, не забудь про заглавную букву и цифру!',
  },
  email: {
    regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorText: 'Укажи корректную почту',
  },
  phone: {
    regExp: /^\+?\d{10,15}$/,
    errorText: 'Номер должен быть от 10 до 15 цифр',
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

export const useValid = (bool: boolean, error: string) => {
  const [isValid, setValid] = useState(false)
  const [errorText, setErrorText] = useState(' ')
  useEffect(() => {
    setValid(bool)
    setErrorText(error)
  }, [bool])

  return { isValid, errorText }
}

export const useValidation = (
  data: Record<string, unknown> & (Partial<User> | SignInData | SignUpData)
) => {
  let valid = {}
  const [profile, setProfile] = useState(data)

  for (const key in data) {
    valid = {
      ...valid,
      [key]: {
        valid: useValid(
          inputValidators[key]?.regExp.test(profile[key] as string),
          inputValidators[key]?.errorText
        ),
        blur: useDirty(),
      },
    }
  }
  return { valid, setProfile, profile }
}
