---
title: Avatar wrapper
description: An image element with a fallback for representing the user.
source: apps/www/src/lib/registry/default/ui/avatar
primitive: https://www.radix-vue.com/components/avatar.html
---

<ComponentPreview name="AvatarWrapperDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-avatar
```
</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/alert/AvatarWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type AvatarVariants, avatarVariant } from '.'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    size?: AvatarVariants['size']
    shape?: AvatarVariants['shape']
    fallback: string
    src?: string
    alt?: string
  }>(),
  {
    size: 'sm',
    shape: 'circle',
    fallback: 'AX',
  },
)
</script>

<template>
  <Avatar :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot>
      <AvatarImage v-if="src" :src="src" :alt="alt || src" />
      <AvatarFallback>{{ fallback }}</AvatarFallback>
    </slot>
  </Avatar>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import AvatarWrapper from '@/components/ui/alert/AvatarWrapper'
</script>

<template>
  <AvatarWrapper src="https://github.com/radix-vue.png" alt="@radix-vue" fallback="CN" />
</template>
```
</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { AvatarWrapper } from '@/components/ui/avatar'
</script>

<template>
  <AvatarWrapper src="https://github.com/radix-vue.png" alt="@radix-vue" fallback="CN" />
</template>
```
