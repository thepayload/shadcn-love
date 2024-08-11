<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/lib/registry/default/ui/alert-dialog'
import { type AlertDialogEmits, type AlertDialogProps, useForwardPropsEmits } from 'radix-vue'

const props = withDefaults(
  defineProps<
    AlertDialogProps & {
      label?: string
      title?: string
      description?: string
      onCancel?: () => void
      onConfirm?: () => void
      cancelText?: string
      confirmText?: string
    }
  >(),
  {
    cancelText: 'Cancel',
    confirmText: 'Continue',
  },
)
const emits = defineEmits<
  AlertDialogEmits & {
    cancel: []
    confirm: []
  }
>()
const modelValue = defineModel<boolean>()

const forwarded = useForwardPropsEmits(props, emits)

function onCancelAction() {
  emits('cancel')
  if (props.onCancel)
    props.onCancel()
}

function onConfirmAction() {
  emits('confirm')
  if (props.onConfirm)
    props.onConfirm()
}
</script>

<template>
  <AlertDialog v-bind="forwarded" v-model:open="modelValue">
    <AlertDialogTrigger as-child>
      <slot name="trigger">
        <Button v-if="props.label" variant="outline">
          {{ props.label }}
        </Button>
      </slot>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <slot
        :title="title"
        :description="description"
        :on-cancel="onCancelAction"
        :cancel-text="cancelText"
        :on-confirm="onConfirmAction"
        :confirm-text="confirmText"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{{ props.title }}</AlertDialogTitle>
          <AlertDialogDescription>
            {{ props.description }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="onCancelAction">
            {{ props.cancelText }}
          </AlertDialogCancel>
          <AlertDialogAction @click="onConfirmAction">
            {{ props.confirmText }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </slot>
    </AlertDialogContent>
  </AlertDialog>
</template>
