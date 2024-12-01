<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/lib/registry/default/ui/menubar'
import {
  MenubarWrapperContent,
} from '@/lib/registry/default/ui/pro/wrapper'

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
