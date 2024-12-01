<script lang="ts" setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/lib/registry/new-york/ui/dialog'
import { cn } from '@/lib/utils'
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits } from 'radix-vue'
import { computed, type HTMLAttributes, ref } from 'vue'
import { CalendarActions, CalendarCell, CalendarCellEvent, CalendarCellEvents, CalendarCellTrigger, type CalendarEvent, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNextButton, CalendarPrevButton } from '.'
import { useCalendarEvents } from './useCalendarEvents'

const props = defineProps<CalendarRootProps & { class?: HTMLAttributes['class'], events: CalendarEvent[] }>()

const emits = defineEmits<CalendarRootEmits & {
  more: [events: CalendarEvent[]]
  eventClick: [event: CalendarEvent]
  eventHover: [event: CalendarEvent]
  cellClick: [date: string]
  cellHover: [date: string]
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const { getEventsByDate } = useCalendarEvents(props.events)

// SHOW MORE
const activeEvents = ref<CalendarEvent[]>([])

const moreDialog = ref(false)

function onShowAllEvent(events: CalendarEvent[]) {
  activeEvents.value = events
  moreDialog.value = true
}

// VIEW EVENTS
const activeEvent = ref<CalendarEvent | null>(null)
const viewDialog = ref(false)

function onEventClick(event: CalendarEvent) {
  activeEvent.value = event
  viewDialog.value = true
  emits('eventClick', event)
}

// CELL CLICK
function onCellClick(date: string) {
  emits('cellClick', date)
}

// VIEW MODE
const viewMode = ref<'month' | 'week' | 'list'>('month')

// MONTH MODEL VALUE
// const month = defineModel('month')
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }" :class="cn('p-3 flex flex-col justify-start items-stretch', props.class)"
    v-bind="forwarded"
  >
    <div class="flex flex-row justify-between items-start">
      <CalendarHeader class="w-fit gap-1">
        <CalendarPrevButton />
        <CalendarHeading />
        <CalendarNextButton />
      </CalendarHeader>
      <div class="flex flex-row justify-end items-start gap-1">
        <CalendarActions v-model:mode="viewMode">
          <template #actions>
            <slot name="actions" />
          </template>
        </CalendarActions>
      </div>
    </div>

    <div v-if="viewMode === 'month'" class="flex flex-grow flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow class="grid grid-cols-7">
            <CalendarHeadCell v-for="day in weekDays" :key="day" class="col-span-1 first-of-type:rounded-tl-lg last-of-type:rounded-tr-lg">
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`"
            class="w-full grid grid-cols-7"
          >
            <CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate" class="col-span-1" :class="{ ' first-of-type:rounded-bl-lg last-of-type:rounded-br-lg': index === month.rows?.length - 1 }" @click="onCellClick(weekDate.toString())">
              <slot name="cell">
                <CalendarCellTrigger :day="weekDate" :month="month.value" />
                <CalendarCellEvents v-if="getEventsByDate(weekDate.toString())?.length > 0" :events="getEventsByDate(weekDate.toString())" name="events" @more="onShowAllEvent" @event-click="onEventClick">
                  <slot name="events" :events="events" />
                  <template #tooltip="{ event }">
                    <slot name="tooltip" :event="event" />
                  </template>
                  <template #event="{ event }">
                    <slot name="event" :event="event" />
                  </template>
                </CalendarCellEvents>
              </slot>
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
    <div v-else-if="viewMode === 'list'" class="flex flex-grow flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`"
            class="w-full grid grid-cols-7"
          >
            <CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate" class="col-span-7" :class="{ 'first-of-type:rounded-t-lg': index === 0, 'last-of-type:rounded-b-lg': index === month.rows?.length - 1 }" content-class="min-h-fit flex flex-row justify-start items-start" @click="onCellClick(weekDate.toString())">
              <slot name="cell">
                <CalendarCellTrigger :day="weekDate" :month="month.value" />
                <CalendarCellEvents v-if="getEventsByDate(weekDate.toString())?.length > 0" :events="getEventsByDate(weekDate.toString())" name="events" @more="onShowAllEvent" @event-click="onEventClick">
                  <slot name="events" :events="events" />
                  <template #tooltip="{ event }">
                    <slot name="tooltip" :event="event" />
                  </template>
                  <template #event="{ event }">
                    <slot name="event" :event="event" />
                  </template>
                </CalendarCellEvents>
              </slot>
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
  <Dialog v-model:open="moreDialog">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Events</DialogTitle>
        <DialogDescription>
          List of events in {{ activeEvents[0]?.date }}
        </DialogDescription>
      </DialogHeader>
      <div>
        <CalendarCellEvents :events="activeEvents" :hover="false" :is-display-all="true" />
      </div>
    </DialogContent>
  </Dialog>
  <Dialog v-model:open="viewDialog">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ activeEvent?.title }}</DialogTitle>
        <DialogDescription>
          {{ activeEvent?.date }}
        </DialogDescription>
      </DialogHeader>
      <div>
        <CalendarCellEvent :event="activeEvent" />
      </div>
    </DialogContent>
  </Dialog>
</template>
