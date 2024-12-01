<script setup lang="ts">
import {
  MenubarCheckboxItem,
  MenubarItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@/lib/registry/new-york/ui/menubar'

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
defineProps<Props>()
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
