import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

const createWebStorage = () => {
  return {
    getItem: (key: string) => {
      return Promise.resolve(localStorage.getItem(key))
    },
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value)
      return Promise.resolve(true)
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key)
      return Promise.resolve()
    },
  }
}

const storage =
  Platform.OS === 'web'
    ? createWebStorage()
    : AsyncStorage

export default storage
