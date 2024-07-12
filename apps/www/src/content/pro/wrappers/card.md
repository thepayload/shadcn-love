---
title: Card Wrapper
description: Displays a card with header, content, and footer.
---

<ComponentPreview name="CardWrapperDemo"  />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-card
```
</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/card/CardWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title?: string
  description?: string
}>()
</script>

<template>
  <Card :class="props.class">
    <slot name="header" :title="title" :description="description">
      <CardHeader v-if="props.title || props.description">
        <CardTitle v-if="props.title">
          {{ props.title }}
        </CardTitle>
        <CardDescription v-if="props.description">
          {{ props.description }}
        </CardDescription>
      </CardHeader>
    </slot>
    <CardContent>
      <slot />
    </CardContent>
    <CardFooter v-if="$slots.footer">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import CardWrapper from '@/components/ui/card/CardWrapper'
</script>

<template>
  <CardWrapper
    title="Notifications"
    description="You have 3 unread messages."
  >
    // Content here
  </CardWrapper>
</template>
```
</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import CardWrapper from '@/components/ui/card/CardWrapper'
</script>

<template>
  <CardWrapper
    title="Notifications"
    description="You have 3 unread messages."
  >
    // Content here
  </CardWrapper>
</template>
```
