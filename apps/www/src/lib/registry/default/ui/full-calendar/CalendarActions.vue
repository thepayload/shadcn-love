<script setup lang="ts">
import { CalendarDays, CalendarRange, TableProperties } from 'lucide-vue-next'
import { Button } from '@/lib/registry/default/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/lib/registry/default/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/lib/registry/default/ui/tooltip'

const mode = defineModel('mode', {
  default: 'month',
})
</script>

<template>
  <div class="flex flex-row justify-end items-start gap-1">
    <Button size="sm" variant="outline">
      Today
    </Button>
    <ToggleGroup v-model="mode" type="single" size="sm" class="h-9 border p-1 rounded-md">
      <ToggleGroupItem value="month" aria-label="Toggle bold" class="h-7 p-0 border-0" :class="{ 'w-7': mode !== 'month', 'px-2': mode === 'month' }">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <CalendarDays class="h-4 w-4" />
              <span v-if="mode === 'month'" class="ml-1">Month</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>View by month</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Toggle italic" class="h-7 p-0 border-0" :class="{ 'w-7': mode !== 'week', 'px-2': mode === 'week' }">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <CalendarRange class="h-4 w-4" />
              <span v-if="mode === 'week'" class="ml-1">Week</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>View by week</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Toggle underline" class="h-7  p-0 border-0" :class="{ 'w-7': mode !== 'list', 'px-2': mode === 'list' }">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <TableProperties class="h-4 w-4" />
              <span v-if="mode === 'list'" class="ml-1">List</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>View by list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroupItem>
    </ToggleGroup>
    <slot name="actions" />
  </div>
</template>
