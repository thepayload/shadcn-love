<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { CalendarHeadCell, type CalendarHeadCellProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes, onUpdated } from 'vue'

const props = defineProps<CalendarHeadCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

onUpdated(() => {
  console.log('CalendarHeadCell updated')
})
</script>

<template>
  <CalendarHeadCell :class="cn('border min-h-8 flex flex-row justify-center items-center w-full h-full text-[0.8rem] font-normal text-muted-foreground', props.class)" v-bind="forwardedProps">
    <slot />
  </CalendarHeadCell>
</template>
