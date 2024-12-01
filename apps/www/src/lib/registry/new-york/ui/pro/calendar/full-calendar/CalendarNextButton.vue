<script lang="ts" setup>
import { buttonVariants } from '@/lib/registry/new-york/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-vue-next'
import { CalendarNext, type CalendarNextProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<CalendarNextProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarNext
    :class="cn(
      buttonVariants({ variant: 'outline', size: 'sm' }),
      'h-9 w-9 bg-transparent p-0',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRight class="h-4 w-4" />
    </slot>
  </CalendarNext>
</template>
