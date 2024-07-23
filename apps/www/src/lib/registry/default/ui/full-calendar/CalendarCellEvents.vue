<script setup lang="ts">
import { computed, onUpdated } from 'vue'
import CalendarCellEvent from './CalendarCellEvent.vue'
import type { CalendarEventsProps } from '.'
import { Button } from '@/lib/registry/default/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/lib/registry/default/ui/hover-card'

const props = withDefaults(defineProps<CalendarEventsProps>(), {
  hover: true,
})
const emits = defineEmits(['more', 'eventClick'])

const shownEvents = computed(() => {
  return props.isDisplayAll ? props.events : props.events?.slice(0, 2)
})

onUpdated(() => {
  console.log('CalendarCellEvents updated')
})
</script>

<template>
  <div class="w-full flex flex-col justify-start items-stretch gap-1">
    <slot :events="events">
      <template v-for="event in shownEvents" :key="event">
        <slot name="event" :event="event">
          <template v-if="!props.hover">
            <CalendarCellEvent :event="event" @click="emits('eventClick', event)" />
          </template>
          <HoverCard v-else>
            <HoverCardTrigger as-child>
              <CalendarCellEvent :event="event" @click="emits('eventClick', event)" />
            </HoverCardTrigger>
            <HoverCardContent>
              <slot name="tooltip" :event="event">
                <div class="flex flex-col justify-start items-start">
                  <strong class="text-sm font-bold mb-2">{{ event.title }}</strong>
                  <div class="text-xs flex flex-row justify-start items-center gap-1">
                    <span>{{ event?.start }}</span>
                    <span>~</span>
                    <span>{{ event?.end }}</span>
                  </div>
                  <div class="text-xs">
                    {{ event?.date }}
                  </div>
                </div>
              </slot>
            </HoverCardContent>
          </HoverCard>
        </slot>
      </template>
      <div v-if="props.events && props.events?.length > 2 && !props.isDisplayAll" class="flex flex-row justify-end items-end">
        <Button size="xs" variant="ghost" class="text-xs" @click="emits('more', events)">
          More...
        </Button>
      </div>
    </slot>
  </div>
</template>
