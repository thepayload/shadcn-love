---
title: Textarea Wrapper
description: Displays a form textarea or a component that looks like a textarea.
---

<ComponentPreview name="TextareaWrapperDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-textarea
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/textarea/TextareaWrapper.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { TextareaWrapper } from '@/components/ui/textarea'

const note = ref('')
</script>

<template>
  <TextareaWrapper v-model="note" label="Note" />
</template>
```

## Examples

### Default

<ComponentPreview name="TextareaWrapperDemo" />

### Disabled

<ComponentPreview name="TextareaWrapperDisabled" />
