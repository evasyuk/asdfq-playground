import { StatusBar } from 'expo-status-bar'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import Providers from './providers'

export default function App() {
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
