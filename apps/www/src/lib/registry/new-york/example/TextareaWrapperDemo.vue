<script setup lang="ts">
import { TextareaWrapper } from '@/lib/registry/default/ui/textarea'
import { ref } from 'vue'

const note = ref('')
</script>

<template>
  <TextareaWrapper v-model="note" label="Notes" placeholder="Type your message here." />
</template>
