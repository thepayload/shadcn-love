<script setup lang="ts">
import { ref } from 'vue'
import { TextareaWrapper } from '@/lib/registry/default/ui/wrapper'

const note = ref('')
</script>

<template>
  <TextareaWrapper v-model="note" :disabled="true" label="Notes" placeholder="Type your message here." />
</template>
