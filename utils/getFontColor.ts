import colorContrast from 'color-contrast'

type GetFontColor = (backgroundColor: string) => '#000000' | '#FFFFFF'

// TODO: cover with unit test
export const getFontColor: GetFontColor = (backgroundColor) => {
  const contrastOnBlack = colorContrast(backgroundColor, '#000')
  const contrastOnWhite = colorContrast(backgroundColor, '#fff')

  return contrastOnBlack > contrastOnWhite ? '#000000' : '#FFFFFF'
}
