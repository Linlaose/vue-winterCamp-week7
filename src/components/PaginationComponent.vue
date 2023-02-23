<script>
export default {
  props: {
    pagination: Object,
  },
};
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pagination.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('changePage', pagination['current_page'] - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: item === pagination.current_page }"
        v-for="item in pagination.total_pages"
        :key="item + 'page'"
      >
        <span class="page-link" v-if="item === pagination.current_page">{{
          item
        }}</span>
        <a
          class="page-link"
          @click.prevent="$emit('changePage', item)"
          v-else
          >{{ item }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: !pagination.has_next }">
        <a
          class="page-link"
          @click.prevent="$emit('changePage', pagination['current_page'] + 1)"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
