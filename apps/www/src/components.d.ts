/* eslint-disable */
// @ts-nocheck
export {}

/* prettier-ignore */
declare module 'vue' {
  export interface GlobalComponents {
    ComponentPreview: typeof import('../.vitepress/theme/components/ComponentPreview.vue')['default'],
    ProComponentPreview: typeof import('../.vitepress/theme/components/ProComponentPreview.vue')['default']
  }
}
