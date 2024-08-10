<script setup lang="ts">
import { ref } from 'vue'
import { InputWrapper } from '@/lib/registry/default/ui/wrapper'

const email = ref('')
</script>

<template>
  <InputWrapper v-model="email" label="Email" type="email" description="Only allow email with @" placeholder="Type your email here" />
</template>
