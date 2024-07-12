---
title: Sheet Wrapper
description: Extends the Dialog component to display content that complements the main content of the screen.
source: apps/www/src/lib/registry/default/ui/sheet
primitive: https://www.radix-vue.com/components/dialog.html
---

<ComponentPreview name="SheetWrapperDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-sheet
```
</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/sheet/SheetWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import { type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'radix-vue'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '.'

const props = withDefaults(
  defineProps<
    DialogRootProps & {
      title?: string
      description?: string
      side?: 'top' | 'right' | 'bottom' | 'left'
    }
  >(),
  {
    side: 'right',
    title: '',
    description: ''
  }
)
const emits = defineEmits<DialogRootEmits>()

const modelValue = defineModel<boolean>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Sheet v-bind="forwarded" v-model:open="modelValue">
    <SheetContent :side="side">
      <SheetHeader v-if="title || description">
        <SheetTitle v-if="title">
          {{ title }}
        </SheetTitle>
        <SheetDescription v-if="description">
          {{ description }}
        </SheetDescription>
      </SheetHeader>
      <slot />
    </SheetContent>
  </Sheet>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SheetWrapper from '@/components/ui/sheet/SheetWrapper'

const isOpen = ref(false)
</script>

<template>
  <Button variant="outline" @click="isOpen = true">
    Open
  </Button>
  <SheetWrapper
    v-model="isOpen"
    title="Edit profile"
    description="Make changes to your profile here. Click save when you're done."
  >
    // Content here
  </SheetWrapper>
</template>
```
</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const isOpen = ref(false)
</script>

<template>
  <Button variant="outline" @click="isOpen = true">
    Open
  </Button>
  <SheetWrapper
    v-model="isOpen"
    title="Edit profile"
    description="Make changes to your profile here. Click save when you're done."
  />
</template>
```

## Examples

### Default

<ComponentPreview name="SheetWrapperDemo" />
