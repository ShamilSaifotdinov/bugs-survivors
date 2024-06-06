import {
  useDispatch,
  useSelector,
  useStore,
  TypedUseSelectorHook,
} from 'react-redux'
import { Store } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from '../store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => Store<RootState> = useStore
