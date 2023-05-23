import { isClient, useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'
import { useSiteConfig } from '../config'

export function useLocale() {
  // const { availableLocales, locale } = useI18n()
  const { locale } = useI18n()
  const lang = useStorage('valaxy-locale', locale.value)
  const siteConfig = useSiteConfig()
  dayjs.locale(lang.value.toLowerCase())

  const toggleLocales = () => {
    // change to some real logic
    // const locales = availableLocales

    // locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    locale.value = lang.value === siteConfig.value.lang ? 'en' : siteConfig.value.lang

    // for localStorage
    lang.value = locale.value

    // set dayjs locale
    dayjs.locale(lang.value.toLowerCase())

    if (isClient)
      document.documentElement.setAttribute('lang', locale.value)
  }

  return {
    lang,
    toggleLocales,
  }
}
