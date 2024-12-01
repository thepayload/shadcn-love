<script setup lang="ts">
import { MenubarWrapper } from '@/lib/registry/default/ui/pro/wrapper'

const menus = [
  {
    label: 'File',
    items: [
      {
        label: 'New Tab',
        shortcut: '⌘T',
        action: () => console.log('New Tab'),
      },
      {
        label: 'New Window',
        shortcut: '⌘N',
        action: () => console.log('New Window'),
      },
      {
        label: 'New Incognito Window',
        disabled: true,
      },
      {
        separator: true,
      },
      {
        label: 'Share',
        items: [
          {
            label: 'Email link',
            action: () => console.log('Email link'),
          },
          {
            label: 'Messages',
            action: () => console.log('Messages'),
            items: [
              {
                label: 'New Tab',
                shortcut: '⌘T',
                action: () => console.log('New Tab'),
              },
              {
                label: 'New Window',
                shortcut: '⌘N',
                action: () => console.log('New Window'),
              },
            ],
          },
          {
            label: 'Notes',
            action: () => console.log('Notes'),
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Print...',
        shortcut: '⌘P',
        action: () => console.log('Print...'),
      },
    ],
  },
  {
    label: 'Edit',
    items: [
      {
        label: 'Undo',
        shortcut: '⌘Z',
        action: () => console.log('Undo'),
      },
      {
        label: 'Redo',
        shortcut: '⇧⌘Z',
        action: () => console.log('Redo'),
      },
      {
        separator: true,
      },
      {
        label: 'Find',
        items: [
          {
            label: 'Find...',
            shortcut: '⌘F',
            action: () => console.log('Find...'),
          },
          {
            label: 'Find next',
            shortcut: '⌘G',
            action: () => console.log('Find next'),
          },
          {
            label: 'Find previous',
            shortcut: '⇧⌘G',
            action: () => console.log('Find previous'),
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <MenubarWrapper :items="menus" />
</template>
