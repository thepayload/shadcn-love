<script setup lang="ts">
import { TextareaWrapper } from '@/lib/registry/default/ui/wrapper'
import { ref } from 'vue'

const note = ref('')
</script>

<template>
  <TextareaWrapper v-model="note" :disabled="true" label="Notes" placeholder="Type your message here." />
</template>
