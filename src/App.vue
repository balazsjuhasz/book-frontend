<template>
  <AppHeader />
  <div>
    <RouterView />
  </div>
  <AppFooter />
</template>

<script>
import AppHeader from "@/components/TheHeader.vue";
import AppFooter from "@/components/TheFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style></style>
