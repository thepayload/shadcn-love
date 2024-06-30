---
title: Alert wrapper
description: Displays a callout for user attention.
---

<ComponentPreview name="AlertWrapperDemo"  />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-alert
```
</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/alert/AlertWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type AlertVariants, alertVariants } from '.'
import { AlertDescription, AlertTitle } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: AlertVariants['variant']
  title?: string
  description?: string
  icon?: any
}>()
</script>

<template>
  <div :class="cn(alertVariants({ variant }), props.class)" role="alert">
    <slot :title="title" :description="description">
      <slot name="icon">
        <component :is="icon" class="h-4 w-4" />
      </slot>
      <AlertTitle>{{ title }}</AlertTitle>
      <AlertDescription> {{ description }} </AlertDescription>
    </slot>
  </div>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import AlertWrapper from '@/components/ui/alert/AlertWrapper'
</script>

<template>
  <AlertWrapper title="Heads up!" description="You can add components to your app using the cli." />
</template>
```
</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { AlertWrapper } from '@/components/ui/alert'
</script>

<template>
  <AlertWrapper title="Heads up!" description="You can add components to your app using the cli." />
</template>
```

## Examples

### Default

<ComponentPreview name="AlertWrapperDemo"  />

### Destructive

<ComponentPreview name="AlertWrapperDestructiveDemo"  />
