import aspectRatioPlugin from '@tailwindcss/aspect-ratio'
import formsPlugin from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
  // important: true,
  content: [],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['Inter', ...defaultTheme.fontFamily.sans],
      // },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [
    aspectRatioPlugin,
    formsPlugin,
  ],
}
