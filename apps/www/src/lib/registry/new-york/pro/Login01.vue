<script lang="ts" setup>
import Logo from '@/components/brand/Logo.vue'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/registry/new-york/ui/card'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/registry/new-york/ui/form'
import { Input } from '@/lib/registry/new-york/ui/input'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Separator } from '@/lib/registry/new-york/ui/separator'
</script>

<template>
  <Card class="w-[350px]">
    <CardHeader class="flex flex-col justify-center items-center">
      <Logo class="w-10 h-10" />
      <CardTitle>Welcome back</CardTitle>
      <CardDescription>Please enter detail to login.</CardDescription>
    </CardHeader>
    <CardContent>
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
    </CardContent>
    <CardFooter class="flex flex-col justify-start items-stretch gap-2">
      <Button class="w-full">
        Sign in
      </Button>
      <Separator class="my-2" />
      <Button variant="secondary" class="w-full">
        Login with Google
      </Button>
      <Button variant="secondary" class="w-full">
        Login with Facebook
      </Button>
    </CardFooter>
  </Card>
</template>
