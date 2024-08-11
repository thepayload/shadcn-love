<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import { TooltipWrapper } from '@/lib/registry/default/ui/wrapper'
</script>

<template>
  <TooltipWrapper content="You can add components to your app using the cli.">
    <Button variant="outline">
      Hover
    </Button>
  </TooltipWrapper>
</template>
