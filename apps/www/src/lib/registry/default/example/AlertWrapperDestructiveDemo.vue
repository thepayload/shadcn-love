<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import { AlertWrapper } from '@/lib/registry/default/ui/alert'
</script>

<template>
  <AlertWrapper variant="destructive" title="Error" description="Your session has expired. Please log in again." :icon="AlertCircle" />
</template>
