<script setup lang="ts"></script>

<template>
  <NuxtLink
    target="_blank"
    class="flex flex-col p-4 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped></style>
