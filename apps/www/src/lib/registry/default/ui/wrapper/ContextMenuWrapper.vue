<script setup lang="ts">
import { useForwardPropsEmits } from 'radix-vue'
import type { ContextMenuRootEmits, ContextMenuRootProps } from 'radix-vue'
import { computed } from 'vue'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/lib/registry/default/ui/context-menu'

interface MenuItem {
  label: string
  shortcut?: string
  disabled?: boolean
  inset?: boolean
  separator?: boolean
  checkbox?: boolean
  radio?: boolean
  options?: MenuItem[]
  value?: string | boolean | any
  action?: () => void
  items: MenuItem[]
}

const props = defineProps<
  ContextMenuRootProps & {
    items: MenuItem[]
  }
>()
const emits = defineEmits<ContextMenuRootEmits>()
const isInset = computed(() => {
  return props.items.some(item => item.radio || item.checkbox)
})

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ContextMenu v-bind="forwarded">
    <ContextMenuTrigger>
      <slot name="trigger">
        <p
          class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
        >
          Right click here
        </p>
      </slot>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-64">
      <template v-for="item in items" :key="item.label">
        <ContextMenuSub v-if="item.items?.length > 0">
          <ContextMenuSubTrigger :inset="isInset || item.inset">
            {{ item.label }}
          </ContextMenuSubTrigger>
          <ContextMenuSubContent class="w-48">
            <template v-for="subItem in item.items" :key="subItem.label">
              <ContextMenuItem :inset="isInset || subItem.inset">
                {{ subItem.label }}
                <ContextMenuShortcut v-if="subItem.shortcut">
                  {{
                    subItem.shortcut
                  }}
                </ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator v-if="subItem.separator" />
            </template>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuCheckboxItem
          v-else-if="item.checkbox"
          :checked="item.value"
          @click="item.action"
        >
          {{ item.label }}
          <ContextMenuShortcut v--if="item.shortcut">
            {{ item.shortcut }}
          </ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuRadioGroup v-else-if="item.radio" v-model="item.value">
          <ContextMenuSeparator />
          <ContextMenuLabel :inset="isInset || item.inset">
            {{ item.label }}
          </ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem
            v-for="radio in item.options"
            :key="radio.value"
            :value="radio.value"
            :inset="isInset || radio.inset"
            @click="radio.action"
          >
            {{ radio.label }}
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuItem
          v-else
          :disabled="item.disabled"
          :inset="isInset || item.inset"
          @click="item.action"
        >
          {{ item.label }}
          <ContextMenuShortcut v-if="item.shortcut">
            {{ item.shortcut }}
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator v-if="item.separator" />
      </template>
    </ContextMenuContent>
  </ContextMenu>
</template>
