<script setup lang="ts">
import { type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'radix-vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/registry/new-york/ui/dialog'

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
