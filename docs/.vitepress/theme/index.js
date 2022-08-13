/*
 * @Description: 
 * @Author: v833
 * @Date: 2022-08-13 15:43:28
 * @LastEditors: v833
 * @LastEditTime: 2022-08-13 15:48:54
 */
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import QUI from 'q-element-components'
// import 'q-element-components/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus),
      app.use(QUI)
  }
}