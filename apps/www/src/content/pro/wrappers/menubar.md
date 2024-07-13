---
title: Menubar Wrapper
description: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
source: apps/www/src/lib/registry/default/ui/menubar
primitive: https://www.radix-vue.com/components/menubar.html
---

<ComponentPreview name="MenubarWrapperDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-menubar
```
</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/menubar/MenubarWrapperContent.vue`) and copy and paste the following code into your project
```vue
<script setup lang="ts">
import {
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger
} from '.'

interface Menu {
  label: string
  shortcut?: string
  disabled?: boolean
  separator?: boolean
  inset?: boolean
  checkbox?: boolean
  radio?: boolean
  key?: string
  value?: string
  action?: () => void
  items: Menu[]
}

interface Props {
  items: Menu[]
}
const props = defineProps<Props>()
</script>

<template>
  <template v-for="item in items" :key="item">
    <MenubarSub v-if="item.items?.length > 0">
      <MenubarSubTrigger>{{ item.label }}</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarWrapperContent :items="item.items" />
      </MenubarSubContent>
    </MenubarSub>
    <MenubarItem
      v-else-if="!item.separator && !item.checkbox && !item.radio"
      :disabled="item.disabled"
      :inset="item.inset"
      @click="item.action"
    >
      {{ item.label }}
      <MenubarShortcut v-if="item.shortcut">
        {{ item.shortcut }}
      </MenubarShortcut>
    </MenubarItem>
    <MenubarSeparator v-else-if="item.separator" />
    <MenubarCheckboxItem v-else-if="item.checkbox">
      {{ item.label }}
    </MenubarCheckboxItem>
    <MenubarRadioGroup v-else-if="item.radio" :value="item.value">
      <MenubarRadioItem
        v-for="radioItem in item.items"
        :key="radioItem.label"
        :value="radioItem.value || radioItem.label"
      >
        {{ radioItem.label }}
      </MenubarRadioItem>
    </MenubarRadioGroup>
  </template>
</template>
```

### Create new component (ex: `@/components/ui/drawer/MenubarWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
  MenubarWrapperContent
} from '.'

interface Menu {
  label: string
  shortcut?: string
  disabled?: boolean
  separator?: boolean
  inset?: boolean
  checkbox?: boolean
  radio?: boolean
  key?: string
  value?: string
  action?: () => void
  items: Menu[]
}

interface Props {
  items: Menu[]
}
const props = defineProps<Props>()
</script>

<template>
  <Menubar>
    <MenubarMenu v-for="item in props.items" :key="item.label">
      <MenubarTrigger>{{ item.label }}</MenubarTrigger>
      <MenubarContent>
        <MenubarWrapperContent :items="item.items" />
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import { MenubarWrapper } from '@/lib/registry/default/ui/menubar'

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
```
</Steps>

</template>
</TabPreview>
