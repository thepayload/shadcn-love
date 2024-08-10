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
  DropdownMenuTrigger,
} from '@/lib/registry/default/ui/dropdown-menu'

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
