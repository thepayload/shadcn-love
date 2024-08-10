<script setup lang="ts">
import {
  Cloud,
  CreditCard,
  Github,
  LifeBuoy,
  Mail,
  MessageSquare,
  Plus,
  Settings,
  User,
  Users,
} from 'lucide-vue-next'

import { Button } from '@/lib/registry/default/ui/button'
import { DropdownMenuWrapper } from '@/lib/registry/default/ui/wrapper'

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
