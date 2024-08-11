<script setup lang="ts">
import { Calendar } from '@/lib/registry/default/ui/full-calendar'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { type Ref, ref } from 'vue'

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>
const events = [{
  id: '1',
  title: 'New events',
  start: '13:00',
  end: '16:00',
  date: '2024-06-30',
  allDay: false,
  backgroundColor: 'bg-secondary',
  borderColor: 'border-primary',
  textColor: 'text-primary',
}, {
  id: '2',
  title: 'New events 01',
  start: '13:00',
  end: '16:00',
  date: '2024-06-30',
  allDay: false,
  backgroundColor: 'bg-yellow-100',
  borderColor: 'border-primary',
  textColor: 'text-primary',
}, {
  id: '2',
  title: 'New events 02',
  start: '13:00',
  end: '16:00',
  date: '2024-06-30',
  allDay: false,
  backgroundColor: 'bg-blue-100',
  borderColor: 'border-primary',
  textColor: 'text-primary',
}, {
  id: '3',
  title: 'New events',
  start: '13:00',
  end: '16:00',
  date: '2024-07-23',
  allDay: false,
  backgroundColor: 'bg-green-100',
  borderColor: 'border-primary',
  textColor: 'text-primary',
}]
</script>

<template>
  <Calendar v-model="value" :events="events" :weekday-format="'short'" />
</template>
