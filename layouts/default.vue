<script setup lang="ts">
</script>

<template>
  <div class="h-full flex flex-col">
    <AppHeader />
    <main class="flex-1 max-h-[calc(100vh-3rem)] grid place-items-center p-6 overflow-auto">
      <slot />
    </main>
  </div>
</template>
