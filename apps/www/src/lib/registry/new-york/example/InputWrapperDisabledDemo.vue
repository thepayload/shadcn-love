<script setup lang="ts">
import { InputWrapper } from '@/lib/registry/new-york/ui/input'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <InputWrapper v-model="email" :disabled="true" label="Email" type="email" description="Only allow email with @" placeholder="Type your email here" />
</template>
