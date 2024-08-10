<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'
import { Input } from '@/lib/registry/new-york/ui/input'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/new-york/ui/form'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  id?: string
  name?: string
  label?: string
  required?: boolean
  placeholder?: string
  description?: string
  disabled?: boolean
  loading?: boolean
  prefix?: string
  suffix?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <FormField v-slot="slotProps" :name="props.name || ''">
    <FormItem v-bind="$attrs">
      <FormLabel v-if="props.label">
        {{ props.label }}
        <span v-if="props.required" class="text-destructive"> *</span>
      </FormLabel>
      <FormControl>
        <Input
          v-bind="slotProps" :id="props.id" v-model="modelValue"
          :placeholder="props.placeholder" :disabled="props.disabled" :loading="props.loading" :class="props.class"
          :prefix="props.prefix" :suffix="props.suffix"
        />
      </FormControl>
      <FormDescription v-if="props.description">
        {{ props.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
