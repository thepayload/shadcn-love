<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState,
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
  useVueTable,
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
  TableRow,
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
  toolbar: true,
})

const selectColumn = {
  id: 'select',
  enablePinning: true,
  header: ({ table }: { table: any }) =>
    h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected(),
      'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
  cell: ({ row }: { row: any }) =>
    h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
  enableSorting: false,
  enableHiding: false,
}

function generateExpandedAction(row: any) {
  const expandedOption = {
    label: 'Expand',
    icon: ChevronsUpDown,
    action: () => row.toggleExpanded(),
  }

  const actions = props.expanded
    ? {
        ...props.actions,
        label: props.actions?.label || 'Actions',
        options: [...(props.actions?.options || []), expandedOption],
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
        h(DataTableRowActions, { row, actions: generateExpandedAction(row) }),
    },
  ]
}
function generateColumns() {
  const filterFn = (row: any, id: any, value: any) => {
    return value.includes(row.getValue(id))
  }
  const header = (title: string) => {
    return ({ column }: { column: any }) => h(DataTableColumnHeader, { column, title })
  }
  const newColumns = props.columns.map(column => ({
    ...column,
    header: column.title ? header(column.title) : column.header,
    filterFn: column.enableFiltering ? column.filterFn || filterFn : undefined,
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
  default: () => [],
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
      right: props.pinning?.right || [],
    },
  },
  enableRowSelection: true,
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: async (updaterOrValue) => {
    await valueUpdater(updaterOrValue, rowSelection)

    const filteredData = props.data.filter((_, index) =>
      rowSelection.value ? Object.keys(rowSelection.value).includes(index.toString()) : [],
    )
    coreRowSelection.value = filteredData
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
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
