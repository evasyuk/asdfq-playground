/**
 *  Please, do not use in production
 */

import dict from './dict.json'

type useI18NType = () => {
  t: (id: string) => string
}

export const useI18N: useI18NType = () => {
  return {
    t: (id) => dict['en'][id] || id,
  }
}
