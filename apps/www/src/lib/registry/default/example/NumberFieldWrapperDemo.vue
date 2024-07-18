<script setup lang="ts">
import { ref } from 'vue'
import { NumberFieldWrapper } from '@/lib/registry/default/ui/number-field'

const total = ref(0)
</script>

<template>
  <NumberFieldWrapper v-model="total" label="Total" type="Total account" description="Only counting active accounts" placeholder="0" />
</template>
