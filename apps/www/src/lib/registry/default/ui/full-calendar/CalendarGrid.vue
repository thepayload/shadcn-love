<script lang="ts" setup>
import { type HTMLAttributes, computed, onUpdated } from 'vue'
import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarGridProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

onUpdated(() => {
  console.log('CalendarGrid updated')
})
</script>

<template>
  <CalendarGrid
    :class="cn('calendar-grid w-full border-collapse ', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarGrid>
</template>
