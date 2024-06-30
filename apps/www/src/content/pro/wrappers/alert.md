---
title: Alert wrapper
description: Displays a callout for user attention.
---

<ComponentPreview name="AlertWrapperDemo"  />

## Installation

```bash
npx shadcn-vue@latest add wrapper-alert
```

## Usage

```vue
<script setup lang="ts">
import { AlertWrapper } from '@/components/ui/alert'
</script>

<template>
  <AlertWrapper title="Heads up!" description="You can add components to your app using the cli." />
</template>
```

## Examples

### Default

<ComponentPreview name="AlertWrapperDemo"  />

### Destructive

<ComponentPreview name="AlertWrapperDestructiveDemo"  />
