<script setup lang="ts">
import { ref } from 'vue'
import { TextareaWrapper } from '@/lib/registry/default/ui/textarea'

const note = ref('')
</script>

<template>
  <TextareaWrapper v-model="note" label="Notes" placeholder="Type your message here." />
</template>
