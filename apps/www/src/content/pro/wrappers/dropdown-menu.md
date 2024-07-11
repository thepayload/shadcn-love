---
title: Dropdown Menu Wrapper
description: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
source: apps/www/src/lib/registry/default/ui/dropdown-menu
primitive: https://www.radix-vue.com/components/dropdown-menu.html
---

<ComponentPreview name="DropdownMenuWrapperDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-dropdown-menu
```
</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/dropdown-menu/DropdownMenuWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '.'

interface MenuItem {
  icon: any
  label: string
  shortcut?: string
  disabled?: boolean
  description?: string
  action?: () => void
  items?: MenuItem[]
}

export interface DropdownMenuProps {
  items: (MenuItem[] | MenuItem)[]
  label: string
  classMenuContent?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

const props = defineProps<DropdownMenuProps>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" :class="[classMenuContent]" :side="side" :align="align">
      <DropdownMenuLabel v-if="props.label">
        {{ props.label }}
      </DropdownMenuLabel>
      <DropdownMenuSeparator v-if="props.label" />
      <template v-for="item in items" :key="item">
        <template v-if="Array.isArray(item)">
          <DropdownMenuGroup>
            <DropdownMenuItem
              v-for="groupItem in item"
              :key="groupItem.label"
              :disabled="groupItem.disabled"
              @click="groupItem.action"
            >
              <component :is="groupItem.icon" class="mr-2 h-4 w-4" />
              <span>{{ groupItem.label }}</span>
              <DropdownMenuShortcut>{{ groupItem.shortcut }}</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </template>
        <DropdownMenuSub v-else-if="item.items && item.items?.length >= 0">
          <DropdownMenuSubTrigger :disabled="item.disabled" @click="item.action">
            <component :is="item.icon" class="mr-2 h-4 w-4" />
            <span>{{ item.label }}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                v-for="subItem in item.items"
                :key="subItem.label"
                :disabled="subItem.disabled"
                @click="subItem.action"
              >
                <component :is="subItem.icon" class="mr-2 h-4 w-4" />
                <span>{{ subItem.label }}</span>
                <DropdownMenuShortcut>{{ subItem.shortcut }}</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem v-else :disabled="item.disabled" @click="item.action">
          <div class="w-full">
            <div class="flex items-center">
              <component :is="item.icon" class="mr-2 h-4 w-4" />
              <span>{{ item.label }}</span>
              <DropdownMenuShortcut>{{ item.shortcut }}</DropdownMenuShortcut>
            </div>
            <p v-if="item.description" class="mr-6 text-gray-500 text-xs">
              {{ item.description }}
            </p>
          </div>
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import DropdownMenuWrapper from '@/components/ui/dropdown-menu/DropdownMenuWrapper.vue'

const menus = [
  [
    {
      icon: User,
      label: 'Profile',
      shortcut: '⇧⌘P',
      action: () => console.log('Profile'),
    },
    {
      icon: CreditCard,
      label: 'Billing',
      shortcut: '⌘B',
      action: () => console.log('Billing'),
    },
    {
      icon: Settings,
      label: 'Settings',
      shortcut: '⌘S',
      action: () => console.log('Settings'),
    },
  ],
  {
    icon: Plus,
    label: 'New',
    shortcut: '⌘N',
    action: () => console.log('New'),
  },
  [
    {
      icon: LifeBuoy,
      label: 'Support',
      shortcut: '⌘/',
      action: () => console.log('Support'),
    },
    {
      icon: Mail,
      label: 'Contact',
      shortcut: '⌘⇧C',
      action: () => console.log('Contact'),
    },
    {
      icon: MessageSquare,
      label: 'Feedback',
      shortcut: '⌘⇧F',
      action: () => console.log('Feedback'),
    },
  ],
  {
    icon: Github,
    label: 'GitHub',
    shortcut: '⌘G',
    action: () => console.log('GitHub'),
  },
  {
    icon: Cloud,
    label: 'Cloud',
    shortcut: '⌘⇧C',
    action: () => console.log('Cloud'),
    items: [
      {
        icon: Users,
        label: 'Users',
        action: () => console.log('Users'),
      },
      {
        label: 'Add User',
        shortcut: '⌘⇧U',
        action: () => console.log('Add User'),
      },
    ],
  },
]
</script>

<template>
  <DropdownMenuWrapper :items="menus" label="The dropdown menu">
    <Button variant="outline">
      Open
    </Button>
  </DropdownMenuWrapper>
</template>
```
</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

## Examples

### Default

<ComponentPreview name="DropdownMenuWrapperDemo" />
