<script setup lang="ts">
interface Props {
    error: {
        statusCode?: number
        message?: string
        stack?: string
    }
}

const props = defineProps<Props>()
</script>

<template>
    <NuxtLayout>
        <CoreErrorDisplay :error="props.error" />
    </NuxtLayout>
</template>
