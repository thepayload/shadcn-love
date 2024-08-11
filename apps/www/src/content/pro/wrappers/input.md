---
title: Input Wrapper
description: Displays a form input field or a component that looks like an input field.
---

<ComponentPreview name="InputWrapperDemo" class="max-w-xs" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-input
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project:

<<< @/lib/registry/default/ui/wrapper/InputWrapper.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { InputWrapper } from '@/components/ui/input'
</script>

<template>
  <InputWrapper v-model="username" label="Username" placeholder="Please input your username" sufix="@" />
</template>
```

## Examples

### Default

<ComponentPreview name="InputWrapperDemo" class="max-w-xs" />

### Disabled

<ComponentPreview name="InputWrapperDisabledDemo" class="max-w-xs" />
