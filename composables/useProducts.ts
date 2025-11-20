import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import { getProducts } from "~/apis";

export const useProducts = () => {
  const router = useRouter();
  const route = useRoute();

  // Reactive filters with initial values from URL
  const page = ref(Number(route.query.page ?? 1));
  const limit = ref(Number(route.query.limit ?? 10));
  const search = ref(String(route.query.search ?? ""));
  const sortBy = ref(String(route.query.sortBy ?? "title"));
  const order = ref(String(route.query.order ?? "asc"));

  // --- Sync filters → URL ---
  const updateUrl = () => {
    router.replace({
      query: {
        page: page.value.toString(),
        limit: limit.value.toString(),
        search: search.value || undefined, // avoid empty string in URL
        sortBy: sortBy.value,
        order: order.value,
      },
    });
  };

  // Keep URL updated whenever filters change
  watch([page, limit, search, sortBy, order], updateUrl);

  const query = useQuery({
    queryKey: ["products", page, limit, search, sortBy, order],
    queryFn: () => getProducts(page.value, limit.value, search.value, sortBy.value, order.value),
  });

  return {
    page,
    limit,
    search,
    sortBy,
    order,
    ...query,
  };
};
