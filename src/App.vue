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
import { store } from "@/store/store.js";

const getCookie = (name) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      store,
    };
  },
  beforeMount() {
    // check for a cookie
    let data = getCookie("_site_data");

    if (data !== "") {
      let cookieData = JSON.parse(data);

      // update store
      store.token = cookieData.token.token;
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      };
    }
  },
  // async mounted() {
  //   const payload = {
  //     foo: "bar",
  //   };

  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/json");
  //   headers.append("Authorization", `Bearer ${store.token}`);

  //   const requestOptions = {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //     headers,
  //   };

  //   const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/foo`, requestOptions);
  //   const respData = await response.json();
  //   console.log(respData);
  // },
};
</script>

<style></style>
