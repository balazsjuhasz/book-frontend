<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <h1 class="mt-3">Books admin</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Security from "@/helpers/security.js";

export default {
  name: "BookListAdminView",
  beforeMount() {
    Security.requireToken();
  },
};
</script>
