---
title: Data Table Wrapper
description: Powerful table and datagrids built using TanStack Table.
primitive: https://tanstack.com/table/v8/docs/guide/introduction
---

<ComponentPreview name="DataTableWrapperDemo" />

## Introduction

Every data table or datagrid I've created has been unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/v8/docs/guide/introduction#what-is-headless-ui) provides.

So instead of a data-table component, I thought it would be more helpful to provide a guide on how to build your own.

We'll start with the basic `<Table />` component and build a complex data table from scratch.

<Callout class="mt-4">

**Tip:** If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.

</Callout>

## Table of Contents

This guide will show you how to use [TanStack Table](https://tanstack.com/table/v8) and the `<Table />` component to build your own custom data table. We'll cover the following topics:

- [Basic Table](#basic-table)
- [Row Actions](#row-actions)
- [Pagination](#pagination)
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Visibility](#visibility)
- [Row Selection](#row-selection)
- [Reusable Components](#reusable-components)

## Installation

<TabPreview name="CLI">
<template #CLI>

### Add the `<DataTable />` component to your project:

```bash
npx shadcn-vue@latest add wrapper-table
```

### Add `tanstack/vue-table` dependency:

```bash
npm install @tanstack/vue-table
```

</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/table/DataTableRowActions.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts" generic="TData, TAction">
import type { Row } from '@tanstack/vue-table'
import type { Component } from 'vue'
import { EllipsisVertical } from 'lucide-vue-next'
import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../dropdown-menu'

interface DataTableRowActionsProps {
  row: Row<TData>
  actions?: {
    label: string
    options: {
      label: string
      icon?: Component
      shortcut?: string
      action?: (row: TData | Row<TData> | unknown) => void
    }[]
  }
}
const props = defineProps<DataTableRowActionsProps>()
</script>

<template>
  <DropdownMenu v-if="props.actions">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <EllipsisVertical class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <DropdownMenuLabel>{{ props.actions.label }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          v-for="(option, index) in props.actions.options"
          :key="index"
          @click="option.action ? option.action(props.row) : null"
        >
          <component :is="option.icon" v-if="option.icon" class="mr-2 h-4 w-4" />
          <span>{{ option.label }}</span>
          <DropdownMenuShortcut v-if="option.shortcut">
            {{ option.shortcut }}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Create new component (ex: `@/components/ui/table/DataTableFacetedFilter.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import type { Component } from 'vue'
import { cn } from '@/lib/utils'
import { Check, CirclePlus } from 'lucide-vue-next'

import { computed } from 'vue'
import { Badge } from '../badge'
import { Button } from '../button'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '../command'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Separator } from '../separator'

interface DataTableFacetedFilter {
  column?: Column<any, any>
  title?: string
  options: {
    label: string
    value: string
    icon?: Component
  }[]
}

const props = defineProps<DataTableFacetedFilter>()

const facets = computed(() => props.column?.getFacetedUniqueValues())
const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))

function filterFunction(list: DataTableFacetedFilter['options'], term: any): any {
  return list.filter(i => i.label.toLowerCase()?.includes(term))
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <CirclePlus class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in options.filter((option) => selectedValues.has(option.value))"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <!-- @vue-ignore -->
      <Command :filter-function="filterFunction">
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="
                (e) => {
                  console.log(e.detail.value)
                  const isSelected = selectedValues.has(option.value)
                  if (isSelected) {
                    selectedValues.delete(option.value)
                  }
                  else {
                    selectedValues.add(option.value)
                  }
                  const filterValues = Array.from(selectedValues)
                  column?.setFilterValue(filterValues.length ? filterValues : undefined)
                }
              "
            >
              <div
                :class="
                  cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.has(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible',
                  )
                "
              >
                <Check :class="cn('h-4 w-4')" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="mr-2 h-4 w-4 text-muted-foreground"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
              >
                {{ facets.get(option.value) }}
              </span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="column?.setFilterValue(undefined)"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
```

### Create new component (ex: `@/components/ui/table/DataTableViewOptions.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { SlidersHorizontal } from 'lucide-vue-next'
import { computed } from 'vue'

import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../dropdown-menu'

interface DataTableViewOptionsProps {
  table: Table<any>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() =>
  props.table
    .getAllColumns()
    .filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide())
)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" class="hidden h-8 ml-auto lg:flex">
        <SlidersHorizontal class="w-4 h-4 mr-2" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :checked="column.getIsVisible()"
        @update:checked="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Create new component (ex: `@/components/ui/table/DataTableToolbar.vue`) and copy and paste the following code into your project

```vue
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
```

### Create new component (ex: `@/components/ui/table/DataTablePagination.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'

import { Button } from '../button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select'

interface DataTablePaginationProps {
  table: Table<any>
}
defineProps<DataTablePaginationProps>()
</script>

<template>
  <div class="flex items-center justify-end lg:justify-between px-2">
    <div class="hidden lg:inline-block flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          Rows per page
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <ChevronsLeft class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeft class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRight class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <ChevronsRight class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
```

### Create new component (ex: `@/components/ui/table/DataTableColumnHeader.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { cn } from '@/lib/utils'

import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-vue-next'
import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../dropdown-menu'

interface DataTableColumnHeaderProps {
  column: Column<any, any>
  title: string
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
          <span>{{ title }}</span>
          <ArrowDown v-if="column.getIsSorted() === 'desc'" class="w-4 h-4 ml-2" />
          <ArrowUp v-else-if="column.getIsSorted() === 'asc'" class="w-4 h-4 ml-2" />
          <ChevronsUpDown v-else class="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUp class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDown class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeOff class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>
```

### Create new component (ex: `@/components/ui/table/DataTable.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState
} from '@tanstack/vue-table'
import { cn, valueUpdater } from '@/lib/utils'

import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import { ChevronsUpDown } from 'lucide-vue-next'
import { type Component, h, ref } from 'vue'
import { Checkbox } from '../checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../table'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTablePagination from './DataTablePagination.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import DataTableToolbar from './DataTableToolbar.vue'

interface Filter {
  value: string
  label: string
  icon: Component | undefined
}
interface DataTableProps {
  columns: (ColumnDef<TData, TValue> & {
    title?: string
    filterable?: boolean
    enableFiltering?: boolean
    align?: 'left' | 'center' | 'right'
  })[]
  data: TData[]
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
  selection?: boolean
  actions?: {
    label: string
    options: {
      label: string
      icon?: Component
      shortcut?: string
      action?: (row: TData | Row<TData> | unknown) => void
    }[]
  }
  expanded?: boolean
  pagination?: boolean
  toolbar?: boolean
  pinning?: {
    left?: string[]
    right?: string[]
  }
}
const props = withDefaults(defineProps<DataTableProps>(), {
  pagination: true,
})

const selectColumn = {
  id: 'select',
  enablePinning: true,
  header: ({ table }: { table: any }) =>
    h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected(),
      'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all'
    }),
  cell: ({ row }: { row: any }) =>
    h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
      'ariaLabel': 'Select row'
    }),
  enableSorting: false,
  enableHiding: false
}

function generateExpandedAction(row: any) {
  const expandedOption = {
    label: 'Expand',
    icon: ChevronsUpDown,
    action: () => row.toggleExpanded()
  }

  const actions = props.expanded
    ? {
        ...props.actions,
        label: props.actions?.label || 'Actions',
        options: [...(props.actions?.options || []), expandedOption]
      }
    : props.actions
  return actions
}
function actionColumn() {
  if (!props.actions && !props.expanded)
    return []
  return [
    {
      id: 'actions',
      cell: ({ row }: { row: any }) =>
        h(DataTableRowActions, { row, actions: generateExpandedAction(row) })
    }
  ]
}
function generateColumns() {
  const filterFn = (row: any, id: any, value: any) => {
    return value.includes(row.getValue(id))
  }
  const header = (title: string, align: string = 'center') => {
    return ({ column }: { column: any }) => h(DataTableColumnHeader, { column, title })
  }
  const newColumns = props.columns.map(column => ({
    ...column,
    header: column.title ? header(column.title, column.align) : column.header,
    filterFn: column.enableFiltering ? column.filterFn || filterFn : undefined
  }))
  const withActionsColumn = [...newColumns, ...actionColumn()]
  return (props.selection ? [selectColumn, ...withActionsColumn] : withActionsColumn) as ColumnDef<
    TData,
    TValue
  >[]
}
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = defineModel<RowSelectionState | undefined>({})
const coreRowSelection = defineModel<TData[]>('selected', {
  type: Array,
  default: () => []
})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return generateColumns()
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get expanded() {
      return expanded.value
    },
    columnPinning: {
      left: props.pinning?.left ? ['select', ...props.pinning?.left] : [],
      right: props.pinning?.right || []
    }
  },
  enableRowSelection: true,
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: async (updaterOrValue) => {
    await valueUpdater(updaterOrValue, rowSelection)

    const filteredData = props.data.filter((_, index) =>
      rowSelection.value ? Object.keys(rowSelection.value).includes(index.toString()) : []
    )
    coreRowSelection.value = filteredData
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues()
})
</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar v-if="props.toolbar" :table="table" :search="props.search" :filters="props.filters" />
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :class="
                cn(
                  { 'sticky bg-background/95': header.column.getIsPinned() },
                  header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                )
              "
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="(row, rowIndex) in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() ? 'selected' : undefined">
                <slot
                  name="row"
                  :row="row"
                  :row-index="rowIndex"
                  :selected="row.getIsSelected()"
                  :cells="row.getVisibleCells()"
                >
                  <TableCell
                    v-for="(cell, cellIndex) in row.getVisibleCells()"
                    :key="cell.id"
                    :class="
                      cn(
                        { 'sticky bg-background/95': cell.column.getIsPinned() },
                        cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                      )
                    "
                  >
                    <slot
                      name="cell"
                      :cell="cell"
                      :row="row"
                      :row-index="rowIndex"
                      :cell-index="cellIndex"
                    >
                      <slot
                        :name="`cell-${cell.column.columnDef.id}`"
                        :cell="cell.getValue()"
                        :row="row.original"
                        :row-index="rowIndex"
                        :cell-index="cellIndex"
                      >
                        <FlexRender
                          :render="cell.column.columnDef.cell"
                          :props="cell.getContext()"
                        />
                      </slot>
                    </slot>
                  </TableCell>
                </slot>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  <slot
                    name="expanded"
                    :row="row"
                    :row-index="rowIndex"
                    :selected="row.getIsSelected()"
                    :cells="row.getVisibleCells()"
                  >
                    {{ JSON.stringify(row.original) }}
                  </slot>
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              <slot name="empty">
                No results.
              </slot>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination v-if="props.pagination" :table="table" />
  </div>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { Badge } from '@/lib/registry/default/ui/badge'
import { Button } from '@/lib/registry/default/ui/button'
import { DataTable } from '@/lib/registry/default/ui/table'
import {
  CreditCard,
  Settings,
  Trash2,
  User
} from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

type Task = z.infer<typeof taskSchema>

const columns: (ColumnDef<Task> & { title?: string, enableFiltering?: boolean, align?: 'left' | 'right' | 'center' })[] = [
  {
    id: 'title',
    accessorKey: 'title',
    enablePinning: true,
    title: 'Title',
    align: 'left',
  },
  {
    id: 'status',
    accessorKey: 'status',
    enableFiltering: true,
    enablePinning: true,
    title: 'Status',
  },
  {
    id: 'label',
    accessorKey: 'label',
    enableSorting: false,
    title: 'Label',
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    title: 'Priority',
  },
  {
    id: 'delete',
    accessorKey: 'delete',
    enablePinning: true,
    title: '',
  },
]
const data = ref<Task[]>([])

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  return [
    {
      id: 'TASK-8782',
      title:
        'You can\'t compress the program without quantifying the open-source SSD pixel!',
      status: 'in progress',
      label: 'documentation',
      priority: 'medium',
    },
    {
      id: 'TASK-7878',
      title:
        'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
      status: 'backlog',
      label: 'documentation',
      priority: 'medium',
    },
    {
      id: 'TASK-7839',
      title: 'We need to bypass the neural TCP card!',
      status: 'todo',
      label: 'bug',
      priority: 'high',
    },
    {
      id: 'TASK-5562',
      title:
        'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
      status: 'backlog',
      label: 'feature',
      priority: 'medium',
    }
  ]
}

function getStatusColor(status: string) {
  switch (status) {
    case 'todo':
      return 'text-red-900 border-red-200 bg-red-50 min-w-[100px] items-center justify-center'
    case 'in progress':
      return 'text-yellow-900 border-yellow-200 bg-yellow-50 min-w-[100px] items-center justify-center'
    case 'done':
      return 'text-green-900 border-green-200 bg-green-50 min-w-[100px] items-center justify-center'
    case 'backlog':
      return 'text-blue-900 border-blue-200 bg-blue-50 min-w-[100px] items-center justify-center'
    case 'canceled':
      return 'text-gray-900 border-gray-200 bg-gray-50 min-w-[100px] items-center justify-center'
    default:
      return 'text-gray-900 border-gray-200 bg-gray-50 min-w-[100px] items-center justify-center'
  }
}

const search = {
  key: 'title',
  placeholder: 'Search by amount',
}

const filters = [
  {
    key: 'status',
    title: 'Status',
    options: [
      { value: 'todo', label: 'Todo', icon: undefined },
      { value: 'in progress', label: 'In Progress', icon: undefined },
      { value: 'done', label: 'Done', icon: undefined },
      { value: 'backlog', label: 'Backlog', icon: undefined },
      { value: 'canceled', label: 'Canceled', icon: undefined },
    ],
  },
]

const actions = {
  label: 'Row actions',
  options: [
    {
      label: 'Edit',
      icon: Settings,
      shortcut: 'E',
      action: (row: Task) => {
        console.log('Edit', row)
      },
    },
    {
      label: 'Delete',
      icon: User,
      shortcut: 'D',
      action: (row: Task) => {
        console.log('Delete', row)
      },
    },
    {
      label: 'View',
      icon: CreditCard,
      shortcut: 'V',
      action: (row: Task) => {
        console.log('View', row)
      },
    },
  ],

}

const pinning = {
  left: ['title', 'status'],
  right: ['delete'],
}

const rowSelection = ref([])
const rowSelectionObjs = ref([])

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="w-full py-10 mx-auto">
    <DataTable
      v-model="rowSelection"
      v-model:selected="rowSelectionObjs"
      :columns="columns"
      :actions="actions"
      :data="data"
      :pinning="pinning"
      :expanded="true"
      :selection="true"
      :search="search"
      :filters="filters"
    >
      <template #cell-title="{ cell }">
        <div
          class="flex items-center space-x-2 whitespace-nowrap max-w-[200px] overflow-hidden"
        >
          <p class="text-sm font-medium w-full text-ellipsis overflow-hidden">
            {{ cell }}
          </p>
        </div>
      </template>
      <template #cell-status="{ cell }">
        <Badge
          variant="outline"
          class="whitespace-nowrap"
          :class="getStatusColor(cell)"
        >
          {{ cell }}
        </Badge>
      </template>
      <template #cell-priority="{ cell }">
        <Badge variant="outline" class="whitespace-nowrap">
          {{ cell }}
        </Badge>
      </template>
      <template #cell-delete>
        <Button variant="outline" danger size="xs">
          <Trash2 class="w-4 h-4 text-destructive" />
        </Button>
      </template>
    </DataTable>
  </div>
</template>
```
</Steps>

</template>
</TabPreview>
