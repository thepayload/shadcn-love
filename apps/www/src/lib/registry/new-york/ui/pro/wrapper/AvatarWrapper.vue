<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { avatarVariant, type AvatarVariants } from '@/lib/registry/new-york/ui/avatar'
import { Avatar, AvatarFallback, AvatarImage } from '@/lib/registry/new-york/ui/avatar'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    size?: AvatarVariants['size']
    shape?: AvatarVariants['shape']
    fallback: string
    src?: string
    alt?: string
  }>(),
  {
    size: 'sm',
    shape: 'circle',
    fallback: 'AX',
  },
)
</script>

<template>
  <Avatar :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot>
      <AvatarImage v-if="src" :src="src" :alt="alt || src" />
      <AvatarFallback>{{ fallback }}</AvatarFallback>
    </slot>
  </Avatar>
</template>
