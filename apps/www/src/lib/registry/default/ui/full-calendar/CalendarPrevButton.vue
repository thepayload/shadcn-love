<script lang="ts" setup>
import { buttonVariants } from '@/lib/registry/default/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-vue-next'
import { CalendarPrev, type CalendarPrevProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<CalendarPrevProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarPrev
    :class="cn(
      buttonVariants({ variant: 'outline', size: 'sm' }),
      'h-9 w-9 bg-transparent p-0',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeft class="h-4 w-4" />
    </slot>
  </CalendarPrev>
</template>
