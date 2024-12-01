<script setup lang="ts">
import { InputWrapper } from '@/lib/registry/default/ui/pro/wrapper'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <InputWrapper v-model="email" label="Email" type="email" description="Only allow email with @" placeholder="Type your email here" />
</template>
