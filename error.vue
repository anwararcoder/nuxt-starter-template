<script setup lang="ts">
interface Props {
    error: {
        status?: number
        message?: string
    }
}

const props = defineProps<Props>()
</script>

<template>
    <NuxtLayout>
        <CoreErrorDisplay :error="props.error" />
    </NuxtLayout>
</template>
