import { Text, TextProps } from '@asdfq/components/Themed'

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
}
