<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/lib/registry/default/ui/button'
import { AlertDialogWrapper } from '@/lib/registry/default/ui/alert-dialog'

const isOpen = ref(false)

function onClosed() {
  console.log('Dialog closed')
}
function onSave() {
  console.log('Save')
}
</script>

<template>
  <Button variant="outline" @click="isOpen = !isOpen">
    Show Dialog
  </Button>
  <AlertDialogWrapper v-model="isOpen" title="Are you absolutely sure?" description="This action cannot be undone. This will permanently delete your account and remove your data from our servers." :confirm-action="onSave" :cancel-action="onClosed" />
</template>
