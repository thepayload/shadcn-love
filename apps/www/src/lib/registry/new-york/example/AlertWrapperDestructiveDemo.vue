<script setup lang="ts">
import { AlertWrapper } from '@/lib/registry/new-york/ui/alert'
import { ExclamationTriangleIcon } from '@radix-icons/vue'
</script>

<template>
  <AlertWrapper variant="destructive" title="Error" description="Your session has expired. Please log in again." :icon="ExclamationTriangleIcon" />
</template>
