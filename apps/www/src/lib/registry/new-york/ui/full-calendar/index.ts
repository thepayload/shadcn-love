export { default as Calendar } from './Calendar.vue'
export { default as CalendarCell } from './CalendarCell.vue'
export { default as CalendarCellTrigger } from './CalendarCellTrigger.vue'
export { default as CalendarGrid } from './CalendarGrid.vue'
export { default as CalendarGridBody } from './CalendarGridBody.vue'
export { default as CalendarGridHead } from './CalendarGridHead.vue'
export { default as CalendarGridRow } from './CalendarGridRow.vue'
export { default as CalendarHeadCell } from './CalendarHeadCell.vue'
export { default as CalendarHeader } from './CalendarHeader.vue'
export { default as CalendarHeading } from './CalendarHeading.vue'
export { default as CalendarNextButton } from './CalendarNextButton.vue'
export { default as CalendarPrevButton } from './CalendarPrevButton.vue'
export { default as CalendarCellEvents } from './CalendarCellEvents.vue'
export { default as CalendarCellEvent } from './CalendarCellEvent.vue'
export { default as CalendarActions } from './CalendarActions.vue'

export interface CalendarEvent {
  id?: string
  title?: string
  start?: string
  end?: string
  date?: string
  allDay?: boolean
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  color?: string
}

export interface CalendarEventProps {
  event?: CalendarEvent
}

export interface CalendarEventsProps {
  events?: CalendarEvent[]
  isDisplayAll?: boolean
  hover?: boolean
}
