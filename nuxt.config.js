import Mode from 'frontmatter-markdown-loader/mode'
const fs = require('fs');

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Reyna Neet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffdd55' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes:'180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ffdd55' },
      {
        rel: 'stylesheet', media: 'screen',
        href: 'https://fontlibrary.org/face/at-night',
        type: 'text/css'
      },
      {
        rel: 'stylesheet', media: 'screen',
        href: 'https://fontlibrary.org/face/chicagoflf',
        type: 'text/css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/style/main.scss',
    '@/assets/style/_globals.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Axios Doc: https://axios.nuxtjs.org/usage
    // Style-Resources Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push(
        {
          test: /\.md$/,
          use: {
            loader:  'frontmatter-markdown-loader',
            options: {
              mode: [Mode.VUE_COMPONENT]
            }
          }
        }
      );
    }
  },
  /*
   ** Static site generation config
   */
  generate: {
    routes (callback) { 
      var dirList = [];
      fs.readdir('./assets/posts', (err, files) => {
        if (err){
          console.log('\n' + err + '\n')
        }
        console.log('\n' + files + '\n')
        files.forEach(file => {
          dirList.push('/blog/' + file.split('.')[0])
        })
        callback(null, dirList)
      })
    }
  }
}
