export const isDEV = (): boolean => {
  try {
    // eslint-disable-next-line no-undef
    return __DEV__
  } catch (e) {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  }
}
