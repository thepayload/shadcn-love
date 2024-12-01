<script setup lang="ts">
import type { CalendarEventProps } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarEventProps>()
</script>

<template>
  <div :class="cn('flex flex-col justify-start items-stretch rounded-sm p-1 text-left text-xs shadow-sm cursor-pointer overflow-hidden hover:shadow', `bg-${props.event?.color}-200 text-${props.event?.color}-500 border-${props.event?.color}-100`, props.event?.backgroundColor, props.event?.backgroundColor, props.event?.textColor)">
    <strong class="font-bold whitespace-nowrap w-full overflow-hidden text-ellipsis">{{ props.event?.title }}</strong>
    <div class="text-2xs flex flex-row justify-start items-center gap-1 w-full overflow-hidden text-ellipsis">
      <span>{{ props.event?.start }}</span>
      <span>~</span>
      <span>{{ props.event?.end }}</span>
    </div>
  </div>
</template>
