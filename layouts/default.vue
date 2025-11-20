<template>
  <!-- Header/Navigation -->
  <header class="border-b border-gray-200 dark:border-gray-800">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-xl font-bold text-gray-900 dark:text-white"
        >
          Nuxt Starter
        </NuxtLink>

        <div class="flex items-center gap-6">
          <NuxtLink
            to="/"
            class="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/about-2"
            class="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            About
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <slot />

  <!-- Footer -->
  <footer class="mt-auto border-t border-gray-200 dark:border-gray-800">
    <div
      class="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400"
    >
      <p>
        &copy; {{ new Date().getFullYear() }} Nuxt Starter Theme. All rights
        reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Layout-specific logic can go here
</script>
