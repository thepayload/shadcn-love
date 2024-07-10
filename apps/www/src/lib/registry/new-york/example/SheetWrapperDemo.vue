<script setup lang="ts">
import { ref } from 'vue'
import {
  SheetWrapper,
} from '@/lib/registry/new-york/ui/sheet'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Input } from '@/lib/registry/new-york/ui/input'
import { Label } from '@/lib/registry/new-york/ui/label'

const isOpen = ref(false)
</script>

<template>
  <Button variant="outline" @click="isOpen = true">
    Open
  </Button>
  <SheetWrapper
    v-model="isOpen"
    title="Edit profile"
    description="Make changes to your profile here. Click save when you're done."
  >
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right"> Name </Label>
        <Input id="name" value="Pedro Duarte" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="username" class="text-right"> Username </Label>
        <Input id="username" value="@peduarte" class="col-span-3" />
      </div>
    </div>
  </SheetWrapper>
</template>
