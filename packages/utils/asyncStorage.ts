import AsyncStorage from '@react-native-async-storage/async-storage'

export enum StorageKey {
  USER = 'user',
  JOBS = 'jobs',
  TOKEN = 'token',
}

export async function removeItemAsync(key: StorageKey): Promise<void> {
  return AsyncStorage.removeItem(key)
}

export async function setItemAsync(key: StorageKey, value: string): Promise<void> {
  return AsyncStorage.setItem(key, value)
}

type GetItemAsyncType = string | undefined

export function getItemAsync<T extends GetItemAsyncType = undefined>(key: StorageKey): Promise<T | undefined> {
  return AsyncStorage.getItem(key) as Promise<T>
}
