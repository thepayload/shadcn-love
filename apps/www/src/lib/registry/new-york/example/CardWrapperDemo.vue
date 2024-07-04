<script setup lang="ts">
import { BellRing, Check } from 'lucide-vue-next'

import { CardWrapper } from '@/lib/registry/new-york/ui/card'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Switch } from '@/lib/registry/new-york/ui/switch'

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
]
</script>

<template>
  <CardWrapper
    class="w-[380px]"
    title="Notifications"
    description="You have 3 unread messages."
  >
    <div class="flex flex-col justify-between items-stretch gap-4">
      <div class="flex items-center space-x-4 rounded-md border p-4">
        <BellRing />
        <div class="flex-1 space-y-1">
          <p class="text-sm font-medium leading-none">
            Push Notifications
          </p>
          <p class="text-sm text-muted-foreground">
            Send notifications to device.
          </p>
        </div>
        <Switch />
      </div>
      <div>
        <div
          v-for="(notification, index) in notifications"
          :key="index"
          class="mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-4 last:mb-0 last:pb-0"
        >
          <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div class="space-y-1">
            <p class="text-sm font-medium leading-none">
              {{ notification.title }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ notification.description }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Button class="w-full">
          <Check class="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </div>
    </div>
  </CardWrapper>
</template>
