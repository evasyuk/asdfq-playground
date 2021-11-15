import { Text, View } from './Themed'
import { getFontColor } from '@asdfq/utils/getFontColor'
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import stc from 'string-to-color'

type AvatarProps = {
  title: string
  size?: number
}

const getTitle = (title: string): string => {
  const splitted = (title || '??').split(' ')
  return splitted.slice(0, 2).reduce((acc, current) => {
    return acc + current.charAt(0)
  }, '')
}

export const Avatar = ({ title, size = 50 }: AvatarProps): JSX.Element => {
  const actualTitle = useMemo(() => getTitle(title), [title])
  const backgroundColor = useMemo(() => stc(title), [title])

  return (
    <View
      style={[
        styles.avatarWrapper,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        {
          backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.avatarText,
          {
            fontSize: size / 2,
          },
          {
            color: getFontColor(backgroundColor),
          },
        ]}
      >
        {actualTitle.toUpperCase()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
  },
})
