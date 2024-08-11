<script setup lang="ts">
import { NumberFieldWrapper } from '@/lib/registry/new-york/ui/number-field'
import { ref } from 'vue'

const total = ref(0)
</script>

<template>
  <NumberFieldWrapper v-model="total" label="Total" type="Total account" description="Only counting active accounts" placeholder="0" />
</template>
