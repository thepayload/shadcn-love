<script setup lang="ts">
import {
  Button,
} from '@/lib/registry/default/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/registry/default/ui/card'
import {
  Input,
} from '@/lib/registry/default/ui/input'
import { Label,
} from '@/lib/registry/default/ui/label'
import {
  TabsWrapper,
} from '@/lib/registry/default/ui/pro/wrapper'
import { ref } from 'vue'

const tabs = [
  {
    value: 'account',
    label: 'Account',
    component: '',
  },
  {
    value: 'password',
    label: 'Password',
    component: '',
    props: {
      label: 'Hello',
      items: [1, 2, 3],
    },
  },
]
const activeTab = ref('account')
</script>

<template>
  <TabsWrapper v-model="activeTab" :tabs="tabs" class="w-[400px]">
    <template #tab-content:account>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="name">
              Name
            </Label>
            <Input id="name" default-value="Pedro Duarte" />
          </div>
          <div class="space-y-1">
            <Label for="username">
              Username
            </Label>
            <Input id="username" default-value="@peduarte" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </template>
    <template #tab-content:password>
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you'll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="current">
              Current password
            </Label>
            <Input id="current" type="password" />
          </div>
          <div class="space-y-1">
            <Label for="new">
              New password
            </Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </Card>
    </template>
  </TabsWrapper>
</template>
