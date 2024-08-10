<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/registry/new-york/ui/card'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title?: string
  description?: string
}>()
</script>

<template>
  <Card :class="props.class">
    <slot name="header" :title="title" :description="description">
      <CardHeader v-if="props.title || props.description">
        <CardTitle v-if="props.title">
          {{ props.title }}
        </CardTitle>
        <CardDescription v-if="props.description">
          {{ props.description }}
        </CardDescription>
      </CardHeader>
    </slot>
    <CardContent>
      <slot />
    </CardContent>
    <CardFooter v-if="$slots.footer">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>
