import type { CalendarEvent } from '.'
import { computed } from 'vue'

export function useCalendarEvents(events: CalendarEvent[]) {
  const mapEvents = computed(() => {
    const maps = new Map<string, CalendarEvent[]>()

    events.forEach((event) => {
      const date = event.date || Date.toString() // Assuming each event has a 'date' property
      if (maps.has(date))
        maps.get(date)?.push(event)
      else
        maps.set(date, [event])
    })

    return maps
  })

  function getEventsByDate(date: string) {
    if (!mapEvents.value.has(date))
      return []
    return Array.from(mapEvents.value.get(date)?.values() || [])
  }
  return {
    events,
    mapEvents,
    getEventsByDate,
  }
}
