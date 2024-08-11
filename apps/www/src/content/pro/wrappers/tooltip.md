---
title: Tooltip Wrapper
description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
source: apps/www/src/lib/registry/default/ui/tooltip
primitive: https://www.radix-vue.com/components/tooltip.html
---

<ComponentPreview name="TooltipWrapperDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add wrapper-tooltip
```

</template>
<template #Manual>

<Steps>

### Create new component (ex: `@/components/ui/tooltip/TooltipWrapper.vue`) and copy and paste the following code into your project

```vue
<script setup lang="ts">
import { TooltipProvider, type TooltipProviderProps } from 'radix-vue'

import { Tooltip, TooltipContent, TooltipTrigger } from '.'

export interface TooltipProps extends TooltipProviderProps {
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}
const props = defineProps<TooltipProps>()
</script>

<template>
  <TooltipProvider v-bind="props">
    <Tooltip>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent :side="side">
        <slot name="content" :content="content">
          <p>{{ content }}</p>
        </slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

### Import and use that new component into project

```vue
<script setup lang="ts">
import Button from '@/components/ui/button/Button'
import TooltipWrapper from '@/components/ui/tooltip/TooltipWrapper'
</script>

<template>
  <TooltipWrapper content="You can add components to your app using the cli.">
    <Button>Show tooltip</Button>
  </TooltipWrapper>
</template>
```
</Steps>

</template>
</TabPreview>

## Examples

### Default

<ComponentPreview name="TooltipWrapperDemo"  />
