<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue'
import { useForwardPropsEmits } from 'radix-vue'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/lib/registry/new-york/ui/drawer'

const props = withDefaults(
  defineProps<
    DrawerRootProps & {
      title?: string
      description?: string
    }
  >(),
  {
    shouldScaleBackground: true,
  },
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
