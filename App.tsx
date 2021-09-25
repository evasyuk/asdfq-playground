import { StatusBar } from 'expo-status-bar'

import useCachedResources from 'hooks/useCachedResources'
import useColorScheme from 'hooks/useColorScheme'
import Providers from 'providers'

import Navigation from './navigation'

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Providers>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </Providers>
    )
  }
}
