<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { getProducts } from '~/apis';

  const queryClient = useQueryClient();
  await queryClient.prefetchQuery({
  queryKey: ["products"],
    queryFn: () => getProducts(),
});
const {
  page,
  limit,
  search,
  sortBy,
  order,
  data,
  isLoading,
  isError,
  error,
} = useProducts();
</script>

<template>
  <section
    class="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950"
  >
    <div class="container mx-auto max-w-7xl px-4">
      <!-- Header -->
      <div class="mb-12 animate-fade-in text-center">
        <h1
          class="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-5xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400"
        >
          Featured Products
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Discover our curated collection of premium products
        </p>
      </div>

      <!-- Filters -->
      <div
        class="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-6 shadow dark:bg-slate-800"
      >
        <!-- Search -->
        <input
          v-model="search"
          placeholder="Search products..."
          class="w-full max-w-xs rounded-lg border border-slate-300 p-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        <!-- Sort By -->
        <select
          v-model="sortBy"
          class="rounded-lg border border-slate-300 p-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="stock">Stock</option>
        </select>

        <!-- Order -->
        <select
          v-model="order"
          class="rounded-lg border border-slate-300 p-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <!-- Limit -->
        <select
          v-model="limit"
          class="rounded-lg border border-slate-300 p-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option :value="6">6</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="animate-pulse overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-slate-800"
        >
          <div class="h-64 bg-slate-200 dark:bg-slate-700" />
          <div class="space-y-4 p-6">
            <div class="h-6 rounded bg-slate-200 dark:bg-slate-700" />
            <div class="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
            <div class="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div
        v-else-if="data?.products"
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="product in data.products"
          :key="product.id"
          class="group transform overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-800"
        >
          <!-- Product Image -->
          <div
            class="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-700"
          >
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <!-- Discount Badge -->
            <div
              v-if="product.discountPercentage > 0"
              class="absolute right-4 top-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 text-sm font-semibold text-white shadow-lg"
            >
              -{{ Math.round(product.discountPercentage) }}%
            </div>

            <!-- Stock Badge -->
            <div
              class="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-lg"
              :class="
                product.stock > 50
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 text-white'
              "
            >
              {{
                product.stock > 50 ? "In Stock" : `Only ${product.stock} left`
              }}
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-6">
            <!-- Category & Brand -->
            <div class="mb-3 flex items-center gap-2">
              <span
                class="rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              >
                {{ product.category }}
              </span>
              <span class="text-xs text-slate-500 dark:text-slate-400">
                {{ product.brand }}
              </span>
            </div>

            <!-- Title -->
            <h3
              class="mb-2 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
            >
              {{ product.title }}
            </h3>

            <!-- Description -->
            <p
              class="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400"
            >
              {{ product.description }}
            </p>

            <!-- Rating -->
            <div class="mb-4 flex items-center gap-2">
              <div class="flex items-center">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="h-4 w-4"
                  :class="
                    star <= Math.round(product.rating)
                      ? 'text-yellow-400'
                      : 'text-slate-300 dark:text-slate-600'
                  "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <span
                class="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {{ product.rating?.toFixed(1) }}
              </span>
            </div>

            <!-- Price & CTA -->
            <div class="flex items-center justify-between">
              <div>
                <div class="text-3xl font-bold text-slate-900 dark:text-white">
                  ${{ product.price?.toFixed(2) }}
                </div>
                <div
                  v-if="product.discountPercentage > 0"
                  class="text-sm text-slate-500 line-through dark:text-slate-400"
                >
                  ${{
                    (
                      product.price /
                      (1 - product.discountPercentage / 100)
                    )?.toFixed(2)
                  }}
                </div>
              </div>
              <button
                class="transform rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Results Info -->
      <div v-if="data?.products" class="mt-12 text-center">
        <p class="text-slate-600 dark:text-slate-400">
          Showing
          <span class="font-semibold text-slate-900 dark:text-white">{{
            data.products.length
          }}</span>
          of
          <span class="font-semibold text-slate-900 dark:text-white">{{
            data.total
          }}</span>
          products
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="data?.total" class="mt-12 flex items-center justify-center gap-4">
        <button
          :disabled="page <= 1"
          @click="page--"
          class="rounded-lg bg-slate-200 px-4 py-2 dark:bg-slate-700 disabled:opacity-40"
        >
          Prev
        </button>

        <span class="font-semibold text-slate-900 dark:text-white">
          Page {{ page }}
        </span>

        <button
          :disabled="page >= Math.ceil(data.total / limit)"
          @click="page++"
          class="rounded-lg bg-slate-200 px-4 py-2 dark:bg-slate-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>
