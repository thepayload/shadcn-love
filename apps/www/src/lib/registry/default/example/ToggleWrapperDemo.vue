<script setup lang="ts">
import { ref } from 'vue'
import { Bold } from 'lucide-vue-next'

import { ToggleWrapper } from '@/lib/registry/default/ui/toggle'

const isBold = ref(false)
</script>

<template>
  <ToggleWrapper v-model="isBold" aria-label="Toggle bold" label="Select bold">
    <Bold class="h-4 w-4" />
  </ToggleWrapper>
</template>
