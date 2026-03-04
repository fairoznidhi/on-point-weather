// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolViewProps, SymbolWeight } from 'expo-symbols'
import { ComponentProps } from 'react'
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native'

type IconMapping = Record<
  SymbolViewProps['name'],
  ComponentProps<typeof MaterialIcons>['name']
>
type IconSymbolName = keyof typeof MAPPING

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'person.circle': 'account-circle',
  thermometer: 'thermostat',
  gauge: 'speed',
  'cloud.rain': 'grain',
  clock: 'access-time',
  'exclamationmark.triangle': 'warning',
  'sun.max': 'wb-sunny',
  'thermometer.sun': 'thermostat',
  location: 'place',
  bell: 'notifications',
  'textformat.size': 'format-size',
  'circle.lefthalf.filled': 'contrast',
  'rectangle.on.rectangle': 'chrome-reader-mode',
  'hand.tap': 'touch-app',
  'info.circle': 'info',
  star: 'star',
  headphones: 'support-agent',
  'questionmark.circle': 'help-outline',
  'doc.text': 'description',
  'arrow.down.doc': 'file-download',
  'g.circle.fill': 'check-circle',
  'rectangle.portrait.and.arrow.right': 'logout',
  minus: 'remove',
  plus: 'add',
  'location.fill': 'location-on',
  'video.fill': 'videocam',
  'person.circle.fill': 'account-circle',
  'sun.max.fill': 'wb-sunny',
  'clock.fill': 'access-time',
} as IconMapping

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  )
}
