<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type AlertVariants, alertVariants } from '@/lib/registry/default/ui/alert'
import { AlertDescription, AlertTitle } from '@/lib/registry/default/ui/alert'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: AlertVariants['variant']
  title?: string
  description?: string
  icon?: any
}>()
</script>

<template>
  <div :class="cn(alertVariants({ variant }), props.class)" role="alert">
    <slot :title="title" :description="description">
      <slot name="icon">
        <component :is="icon" class="h-4 w-4" />
      </slot>
      <AlertTitle>{{ title }}</AlertTitle>
      <AlertDescription> {{ description }} </AlertDescription>
    </slot>
  </div>
</template>
