import { useEffect } from 'react'
import { useAppDispatch, useAppSelector, useAppStore } from './reduxHooks'
import {
  setPageHasBeenInitializedOnServer,
  selectPageHasBeenInitializedOnServer,
} from '../store/slices/ssrSlice'
import { PageInitArgs, PageInitContext } from '../routes'

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): PageInitContext => ({
  clientToken: getCookie('token'),
})

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch()
  const pageHasBeenInitializedOnServer = useAppSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store = useAppStore()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }
    initPage({ dispatch, state: store.getState(), ctx: createContext() })
  }, [])
}
