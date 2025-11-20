<script lang="ts" setup>
definePageMeta({
    title: 'About',
})
</script>

<template>
    <div class="space-y-8">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                About This Project
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Learn more about the Nuxt Starter Theme
            </p>
        </div>

        <div class="max-w-3xl mx-auto">
            <div class="prose dark:prose-invert">
                <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Features
                </h2>
                <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>✅ Nuxt.js v4 with TypeScript</li>
                    <li>✅ Tailwind CSS v4</li>
                    <li>✅ TanStack Query v5</li>
                    <li>✅ Dark mode support</li>
                    <li>✅ Page and layout transitions</li>
                    <li>✅ ESLint & Prettier</li>
                    <li>✅ SEO-ready meta tags</li>
                </ul>

                <div class="mt-8">
                    <NuxtLink
to="/"
                        class="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        ← Back to Home
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
