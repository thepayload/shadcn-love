<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'
import type { ToggleProps } from 'radix-vue'
import { Toggle } from '@/lib/registry/default/ui/toggle'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/default/ui/form'

const props = withDefaults(defineProps<ToggleProps & {
  defaultValue?: boolean
  modelValue?: boolean
  class?: HTMLAttributes['class']
  id?: string
  name?: string
  label?: string
  required?: boolean
  placeholder?: string
  description?: string
  disabled?: boolean
  loading?: boolean
}>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <FormField v-slot="slotProps" :name="props.name || 'toggle'">
    <FormItem v-bind="$attrs">
      <FormLabel v-if="props.label">
        {{ props.label }}
        <span v-if="props.required" class="text-destructive"> *</span>
      </FormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Toggle
            v-bind="slotProps" :id="props.id" v-model="modelValue"
            :disabled="props.disabled" :loading="props.loading" :class="props.class"
          >
            <slot />
          </Toggle>
        </slot>
      </FormControl>
      <FormDescription v-if="props.description">
        {{ props.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
