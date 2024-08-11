---
title: Tabs Wrapper
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
source: apps/www/src/lib/registry/default/ui/tabs
primitive: https://www.radix-vue.com/components/tabs.html
---

<ComponentPreview name="TabsWrapperDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-tabs
```
</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/tabs/TabsWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'

const props = defineProps<
  TabsRootProps & {
    tabs: {
      value: string
      label: string
      component: any
      to?: string
      props?: Record<string, any>
      events?: Record<string, any>
    }[]
  }
>()
const emits = defineEmits<TabsRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Tabs v-bind="forwarded">
    <TabsList class="grid w-full" :class="`grid-cols-${tabs?.length}`">
      <TabsTrigger v-for="(tab, index) in tabs" :key="`${index}__tab-trigger`" :value="tab.value">
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="(tab, index) in tabs" :key="`${index}__tab-content`" :value="tab.value">
      <slot name="tab-content" :tab="tab">
        <slot :name="`tab-content:${tab.value}`" :tab="tab">
          <component :is="tab.component" v-bind="tab.props" v-on="tab.events" />
        </slot>
      </slot>
    </TabsContent>
  </Tabs>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import TabsWrapper from '@/components/ui/tabs/TabsWrapper'

const tabs = [
  {
    value: 'account',
    label: 'Account',
    component: '',
  },
  {
    value: 'password',
    label: 'Password',
    component: '',
    props: {
      label: 'Hello',
      items: [1, 2, 3],
    },
  },
]
</script>

<template>
  <TabsWrapper v-model="activeTab" :tabs="tabs" class="w-[400px]">
    <template #tab-content:account>
      // Component A
    </template>
    <template #tab-content:password>
      // Component B
    </template>
  </TabsWrapper>
</template>
```
</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import TabsWrapper from '@/components/ui/tabs/TabsWrapper'
</script>

<template>
  <TabsWrapper v-model="activeTab" :tabs="tabs" class="w-[400px]">
    <template #tab-content:account>
      // Component A
    </template>
    <template #tab-content:password>
      // Component B
    </template>
  </TabsWrapper>
</template>
```
