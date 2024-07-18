<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/default/ui/form'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/lib/registry/default/ui/number-field'

const props = defineProps<{
  defaultValue?: undefined | number
  modelValue?: undefined | number
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
        <NumberField
          v-bind="slotProps" :id="props.id"
          v-model="modelValue"
          :min="0"
          :format-options="{
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'code',
            currencySign: 'accounting',
          }"
        >
          <NumberFieldContent>
            <NumberFieldDecrement :disabled="props.disabled" />
            <FormControl>
              <NumberFieldInput :placeholder="props.placeholder" :disabled="props.disabled" :loading="props.loading" :class="props.class" />
            </FormControl>
            <NumberFieldIncrement :disabled="props.disabled" />
          </NumberFieldContent>
        </NumberField>
      </FormControl>
      <FormDescription v-if="props.description">
        {{ props.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
