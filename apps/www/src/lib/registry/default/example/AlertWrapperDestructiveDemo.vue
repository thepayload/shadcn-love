<script setup lang="ts">
import { AlertWrapper } from '@/lib/registry/default/ui/pro/wrapper'
import { AlertCircle } from 'lucide-vue-next'
</script>

<template>
  <AlertWrapper variant="destructive" title="Error" description="Your session has expired. Please log in again." :icon="AlertCircle" />
</template>
