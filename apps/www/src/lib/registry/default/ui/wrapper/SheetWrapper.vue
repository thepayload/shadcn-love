<script setup lang="ts">
import { type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'radix-vue'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/lib/registry/default/ui/sheet'

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
    description: '',
  },
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
