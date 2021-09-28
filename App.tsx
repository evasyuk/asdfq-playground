import { StatusBar } from 'expo-status-bar'

import useCachedResources from 'packages/hooks/useCachedResources'
import useColorScheme from 'packages/hooks/useColorScheme'
import Providers from 'packages/providers'

import Navigation from './packages/navigation'

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
