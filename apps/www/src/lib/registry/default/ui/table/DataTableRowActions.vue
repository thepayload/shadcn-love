<script setup lang="ts" generic="TData, TAction">
import type { Row } from '@tanstack/vue-table'
import type { Component } from 'vue'
import { EllipsisVertical } from 'lucide-vue-next'
import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../dropdown-menu'

interface DataTableRowActionsProps {
  row: Row<TData>
  actions?: {
    label: string
    options: {
      label: string
      icon?: Component
      shortcut?: string
      action?: (row: TData | Row<TData> | unknown) => void
    }[]
  }
}
const props = defineProps<DataTableRowActionsProps>()
</script>

<template>
  <DropdownMenu v-if="props.actions">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <EllipsisVertical class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <DropdownMenuLabel>{{ props.actions.label }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          v-for="(option, index) in props.actions.options"
          :key="index"
          @click="option.action ? option.action(props.row) : null"
        >
          <component :is="option.icon" v-if="option.icon" class="mr-2 h-4 w-4" />
          <span>{{ option.label }}</span>
          <DropdownMenuShortcut v-if="option.shortcut">
            {{ option.shortcut }}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
