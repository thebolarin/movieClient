<template>
  <div>
    <table class="bordered highlight responsive-table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.name"
            @click="$emit('sort', column.name)"
            :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'"
            :style="'width:'+column.width+';'+'cursor:pointer;'"
          >{{column}}</th>
        </tr>
      </thead>
      <slot></slot>
    </table>
  </div>
</template>

<script>
export default {
  props: ["columns", "sortKey", "sortOrders"]
};
</script>