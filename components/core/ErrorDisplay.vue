<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGlobalError } from '~/composables/useGlobalError';

const props = defineProps<{
    error: {
        status?: number
        message?: string
    }
}>()

const { clearError } = useGlobalError();
const router = useRouter()

const handleError = () => {
    clearError();
    router.push('/')
}

const tryAgain = () => {
    router.go(0)
}
</script>

<template>
    <div class="container-custom py-16">
        <div class="mx-auto max-w-2xl text-center">

            <h1 class="mb-4 text-6xl font-bold">
                {{ props.error?.status || "Error" }}
            </h1>

            <p class="mb-8 text-xl text-gray-600 dark:text-gray-400">
                {{ props.error?.message || "An unexpected error occurred" }}
            </p>

            <div class="flex justify-center gap-4">
                <button class="btn-primary" @click="handleError">
                    <Icon name="heroicons:home" class="mr-2 h-5 w-5" />
                    Go Home
                </button>

                <button class="btn-outline" @click="tryAgain">
                    <Icon name="heroicons:arrow-path" class="mr-2 h-5 w-5" />
                    Try Again
                </button>
            </div>

        </div>
    </div>
</template>
