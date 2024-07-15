<script setup lang="ts">
import { ref } from 'vue'
import { InputWrapper } from '@/lib/registry/new-york/ui/input'

const email = ref('')
</script>

<template>
  <InputWrapper v-model="email" :disabled="true" label="Email" type="email" description="Only allow email with @" placeholder="Type your email here" />
</template>
