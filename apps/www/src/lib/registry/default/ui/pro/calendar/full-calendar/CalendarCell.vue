<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { CalendarCell, type CalendarCellProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<CalendarCellProps & { class?: HTMLAttributes['class'], contentClass?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCell
    :class="cn('border focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50', props.class)"
    v-bind="forwardedProps"
  >
    <div :class="cn('min-h-24 flex flex-col justify-start items-start relative h-full w-full p-1 text-center text-sm', props.contentClass) ">
      <slot />
    </div>
  </CalendarCell>
</template>
