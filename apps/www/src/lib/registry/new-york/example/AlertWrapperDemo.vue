<script setup lang="ts">
import { AlertWrapper } from '@/lib/registry/new-york/ui/alert'
import { Terminal } from 'lucide-vue-next'
</script>

<template>
  <AlertWrapper title="Heads up!" description="You can add components to your app using the cli." :icon="Terminal" />
</template>
