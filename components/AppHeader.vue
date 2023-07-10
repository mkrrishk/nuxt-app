<script setup lang="ts">
const router = useRouter()
const user = useSupabaseUser()
const client = useSupabaseAuthClient()

const onLogout = async () => {
  await client.auth.signOut()
  router.push('/auth/login')
}
</script>

<template>
  <header class="flex h-12 px-6 items-center justify-between py-6 shadow-md">
    <div class="inline-flex gap-4 items-center justify-center">
      <img class="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Nuxt App">
      <h2 class="text-2xl font-semibold text-gray-900 hidden sm:block">
        Nuxt App
      </h2>
    </div>
    <div class="inline-flex gap-4 items-center justify-center">
      <div class="text-md text-gray-900 hidden sm:block">
        {{ user?.user_metadata.firstName }} {{ user?.user_metadata.lastName }}
      </div>
      <button type="button" class="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 shadow-sm hover:bg-indigo-100 border border-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100" @click="onLogout">
        <Icon name="lucide:log-out" />
        Logout
      </button>
    </div>
  </header>
</template>
