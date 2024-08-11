<script setup lang="ts" generic="TData">
import type { Table } from '@tanstack/vue-table'
import { X } from 'lucide-vue-next'

import { type Component, computed } from 'vue'
import { Button } from '../button'
import { Input } from '../input'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'

interface Filter {
  value: string
  label: string
  icon: Component | undefined
}
interface DataTableToolbarProps {
  table: Table<TData>
  search?: {
    key: string
    placeholder: string
    fuction: (value: string) => void
  }
  filters?: {
    key: string
    title: string
    options: Filter[]
  }[]
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <template v-if="props.search">
        <Input
          :placeholder="props.search?.placeholder ?? 'Search...'"
          :model-value="(table.getColumn(props.search?.key)?.getFilterValue() as string) ?? ''"
          class="h-8 w-[150px] lg:w-[250px]"
          @input="table.getColumn(props.search?.key)?.setFilterValue($event.target.value)"
        />
      </template>
      <template v-if="props?.filters && props?.filters?.length > 0">
        <DataTableFacetedFilter
          v-for="(filter, index) in props.filters"
          :key="index"
          :column="table.getColumn(filter?.key)"
          :title="filter.title"
          :options="filter.options"
        />
      </template>

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <X class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
