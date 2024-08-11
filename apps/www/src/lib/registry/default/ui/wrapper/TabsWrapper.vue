<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'radix-vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/registry/default/ui/tabs'
import { useForwardPropsEmits } from 'radix-vue'

const props = defineProps<
  TabsRootProps & {
    tabs: {
      value: string
      label: string
      component: any
      to?: string
      props?: Record<string, any>
      events?: Record<string, any>
    }[]
  }
>()
const emits = defineEmits<TabsRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Tabs v-bind="forwarded">
    <TabsList class="grid w-full" :class="`grid-cols-${tabs?.length}`">
      <TabsTrigger v-for="(tab, index) in tabs" :key="`${index}__tab-trigger`" :value="tab.value">
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="(tab, index) in tabs" :key="`${index}__tab-content`" :value="tab.value">
      <slot name="tab-content" :tab="tab">
        <slot :name="`tab-content:${tab.value}`" :tab="tab">
          <component :is="tab.component" v-bind="tab.props" v-on="tab.events" />
        </slot>
      </slot>
    </TabsContent>
  </Tabs>
</template>
