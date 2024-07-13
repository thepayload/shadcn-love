---
title: Dialog Wrapper
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
source: apps/www/src/lib/registry/default/ui/dialog
primitive: https://www.radix-vue.com/components/dialog.html
---

<ComponentPreview name="DialogWrapperDemo" />

 ## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add dialog
```

</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/dialog/DialogWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import { type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'radix-vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '.'

const props = defineProps<
  DialogRootProps & {
    title?: string
    description?: string
  }
>()
const emits = defineEmits<DialogRootEmits>()
const modelValue = defineModel<boolean>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog v-bind="forwarded" v-model:open="modelValue">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader v-if="title || description" class="p-6 pb-0">
        <DialogTitle v-if="title">
          {{ props.title }}
        </DialogTitle>
        <DialogDescription v-if="description">
          {{ props.description }}
        </DialogDescription>
      </DialogHeader>
      <slot />
    </DialogContent>
  </Dialog>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import DialogWrapper from '@/components/ui/dialog/DialogWrapper'
</script>

<template>
  <DialogWrapper
    title="Notifications"
    description="You have 3 unread messages."
  >
    // Content here
  </DialogWrapper>
</template>
```
</Steps>

</template>
</TabPreview>

## Examples

### Custom close button

<ComponentPreview name="DialogCustomCloseButton" />

### Scroll body

<ComponentPreview name="DialogScrollBodyDemo" />

### Scroll overlay

<ComponentPreview name="DialogScrollOverlayDemo" />

## Notes

To activate the `Dialog` component from within a `Context Menu` or `Dropdown Menu`, you must encase the `Context Menu` or `Dropdown Menu` component in the `Dialog` component. For more information, refer to the linked issue [here](https://github.com/radix-ui/primitives/issues/1836).

```js:line-numbers showLineNumber{14-25}
<Dialog>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Open</ContextMenuItem>
      <ContextMenuItem>Download</ContextMenuItem>
      <DialogTrigger asChild>
        <ContextMenuItem>
          <span>Delete</span>
        </ContextMenuItem>
      </DialogTrigger>
    </ContextMenuContent>
  </ContextMenu>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this file from our servers?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
