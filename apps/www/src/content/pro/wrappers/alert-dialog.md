---
title: Alert Dialog wrapper
description: A modal dialog that interrupts the user with important content and expects a response.
source: apps/www/src/lib/registry/default/ui/alert-dialog
primitive: https://www.radix-vue.com/components/alert-dialog.html
---

<ComponentPreview name="AlertDialogWrapperDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-alert-dialog
```
</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/alert-dialog/AlertDialogWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import { type AlertDialogEmits, type AlertDialogProps, useForwardPropsEmits } from 'radix-vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '.'

const props = withDefaults(
  defineProps<
    AlertDialogProps & {
      label?: string
      title?: string
      description?: string
      onCancel?: () => void
      onConfirm?: () => void
      cancelText?: string
      confirmText?: string
    }
  >(),
  {
    cancelText: 'Cancel',
    confirmText: 'Continue'
  }
)
const emits = defineEmits<
  AlertDialogEmits & {
    cancel: []
    confirm: []
  }
>()
const modelValue = defineModel<boolean>()

const forwarded = useForwardPropsEmits(props, emits)

function onCancelAction() {
  emits('cancel')
  if (props.onCancel)
    props.onCancel
}

function onConfirmAction() {
  emits('confirm')
  if (props.onConfirm)
    props.onConfirm
}
</script>

<template>
  <AlertDialog v-bind="forwarded" v-model:open="modelValue">
    <AlertDialogTrigger as-child>
      <slot name="trigger">
        <Button v-if="props.label" variant="outline">
          {{ props.label }}
        </Button>
      </slot>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <slot
        :title="title"
        :description="description"
        :on-cancel="onCancelAction"
        :cancel-text="cancelText"
        :on-confirm="onConfirmAction"
        :confirm-text="confirmText"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{{ props.title }}</AlertDialogTitle>
          <AlertDialogDescription>
            {{ props.description }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="onCancelAction">
            {{ props.cancelText }}
          </AlertDialogCancel>
          <AlertDialogAction @click="onConfirmAction">
            {{ props.confirmText }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </slot>
    </AlertDialogContent>
  </AlertDialog>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import AlertDialogWrapper from '@/components/ui/alert-dialog/AlertDialogWrapper'
</script>

<template>
  <AlertDialogWrapper title="Heads up!" description="You can add components to your app using the cli." />
</template>
```
</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>Open</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```
