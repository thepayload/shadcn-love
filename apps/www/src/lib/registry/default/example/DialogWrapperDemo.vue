<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/lib/registry/default/ui/button'
import {
  DialogFooter,
} from '@/lib/registry/default/ui/dialog'
import {
  DialogWrapper,
} from '@/lib/registry/default/ui/wrapper'

import { Input } from '@/lib/registry/default/ui/input'
import { Label } from '@/lib/registry/default/ui/label'

const isOpen = ref(false)
</script>

<template>
  <Button variant="outline" @click="isOpen = !isOpen">
    Edit Profile
  </Button>
  <DialogWrapper
    v-model="isOpen"
    title="Edit profile"
    description=" Make changes to your profile here. Click save when you're done."
  >
    <div class="grid gap-4 py-4 sm:max-w-[425px]">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right"> Name </Label>
        <Input id="name" value="Pedro Duarte" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="username" class="text-right"> Username </Label>
        <Input id="username" value="@peduarte" class="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">
        Save changes
      </Button>
    </DialogFooter>
  </DialogWrapper>
</template>
