<script setup lang="ts">
import { ContextMenuWrapper } from '@/lib/registry/default/ui/wrapper'

const menus = [
  {
    label: 'Back',
    shortcut: '⌘[',
    action: () => console.log('Back'),
  },
  {
    label: 'Forward',
    shortcut: '⌘]',
    disabled: true,
    action: () => console.log('Forward'),
  },
  {
    label: 'Reload',
    shortcut: '⌘R',
    action: () => console.log('Reload'),
  },
  {
    label: 'More Tools',
    items: [
      {
        label: 'Save Page As...',
        shortcut: '⇧⌘S',
        action: () => console.log('Save Page As...'),
      },
      {
        label: 'Create Shortcut...',
        action: () => console.log('Create Shortcut...'),
      },
      {
        label: 'Name Window...',
        action: () => console.log('Name Window...'),
        separator: true,
      },
      {
        label: 'Developer Tools',
        action: () => console.log('Developer Tools'),
      },
    ],
  },
  {
    label: 'Show Bookmarks Bar',
    shortcut: '⌘⇧B',
    checkbox: true,
    checked: true,
    action: () => console.log('Show Bookmarks Bar'),
  },
  {
    label: 'Show Full URLs',
    checkbox: true,
    action: () => console.log('Show Full URLs'),
  },
  {
    label: 'Pedro',
    radio: true,
    options: [
      { label: 'Pedro', value: 'pedro' },
      { label: 'Pablo', value: 'pablo' },
      { label: 'Juan', value: 'juan' },
    ],
    action: value => console.log(value),
  },
]
</script>

<template>
  <ContextMenuWrapper :items="menus">
    <template #trigger>
      <p
        class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click here
      </p>
    </template>
  </ContextMenuWrapper>
</template>
