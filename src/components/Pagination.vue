<template>
  <div class="section_c">
    <div class="paginate">

      <slot></slot>
    </div>

    <span>
      <p>Showing {{pagination.currentPage}} of {{pagination.lastPage}} from {{pagination.total}}</p>
    </span>
  </div>
</template>

<script>
export default {
  props: ["pagination", "client", "filtered"]
};
</script>