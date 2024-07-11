---
title: Drawer Wrapper
description: A drawer component for vue.
source: apps/www/src/lib/registry/default/ui/drawer
primitive: https://github.com/radix-vue/vaul-vue
---

<ComponentPreview name="DrawerWrapperDemo" />

## About

Drawer is built on top of [Vaul Vue](https://github.com/radix-vue/vaul-vue).

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-drawer
```
</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/drawer/DrawerWrapper.vue`) and copy and paste the following code into your project

```vue
<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue'
import { useForwardPropsEmits } from 'radix-vue'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '.'

const props = withDefaults(
  defineProps<
    DrawerRootProps & {
      title?: string
      description?: string
    }
  >(),
  {
    shouldScaleBackground: true
  }
)

const emits = defineEmits<DrawerRootEmits>()
const modelValue = defineModel<boolean>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Drawer v-bind="forwarded" v-model:open="modelValue">
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle v-if="props.title">
          {{ props.title }}
        </DrawerTitle>
        <DrawerDescription v-if="props.description">
          {{ props.description }}
        </DrawerDescription>
      </DrawerHeader>
      <slot />
    </DrawerContent>
  </Drawer>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import DrawerWrapper from '@/components/ui/drawer/DrawerWrapper'
</script>

<template>
  <DrawerWrapper
    title="Notifications"
    description="You have 3 unread messages."
  >
    // Content here
  </DrawerWrapper>
</template>
```
</Steps>

</template>
</TabPreview>

## Examples

### Responsive Dialog

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` component on desktop and a `Drawer` on mobile.

<ComponentPreview name="DrawerDialog" />
