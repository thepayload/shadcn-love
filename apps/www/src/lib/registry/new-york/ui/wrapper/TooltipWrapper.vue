<script setup lang="ts">
import { TooltipProvider, type TooltipProviderProps } from 'radix-vue'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/lib/registry/new-york/ui/tooltip'

export interface TooltipProps extends TooltipProviderProps {
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}
const props = defineProps<TooltipProps>()
</script>

<template>
  <TooltipProvider v-bind="props">
    <Tooltip>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent :side="side">
        <slot name="content" :content="content">
          <p>{{ content }}</p>
        </slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
