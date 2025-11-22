<script lang="ts" setup>
import { useQuery, useQueryClient } from '@tanstack/vue-query'

definePageMeta({ title: 'Sections' })

const { $axiosAPI } = useNuxtApp()
const queryClient = useQueryClient()

interface Section {
  id: number
  name: string
  type: string
  image: string | null
  section_style: string | null
  background_color: string | null
}

// Prefetch for SSR
await queryClient.prefetchQuery({
  queryKey: ['sections'],
  queryFn: async () => {
    const res = await $axiosAPI.get("/api/v1/sections/")
    return res.data.data as Section[]
  }
})

const { data, isLoading, isError, error } = useQuery<Section[]>({
  queryKey: ['sections'],
  queryFn: async () => {
    const res = await $axiosAPI.get("/api/v1/sections/")
    return res.data.data as Section[]
  },
})

</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">{{ $t('welcome') }}</h1>

    <div v-if="isLoading" class="text-blue-600">Loading sections...</div>

    <div v-if="isError" class="text-red-600">
      Error loading sections: {{ error?.message }}
    </div>

    <div v-if="data" class="space-y-4">
      <div v-for="section in data" :key="section.id" class="p-4 border rounded shadow-sm bg-white">
        <h2 class="font-semibold text-lg">{{ section.name }}</h2>
        <p class="text-sm text-gray-500">Type: {{ section.type }}</p>

        <div v-if="section.image" class="mt-2">
          <img :src="section.image" class="w-32 rounded border" alt="section image" />
        </div>

        <p class="mt-2">
          <strong>Style:</strong> {{ section.section_style }}
        </p>

        <p>
          <strong>Background:</strong> {{ section.background_color }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>