<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/books">Books</RouterLink>
          </li>

          <li v-if="store.token !== ''" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navBarDropDown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu" aria-labelledby="navBarDropDown">
              <li>
                <RouterLink class="dropdown-item" to="/admin/users">Manage Users</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/admin/users/0">Add Users</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/admin/books">Manage Books</RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  :to="{ name: 'book-admin', params: { bookId: 0 } }"
                >
                  Add Book
                </RouterLink>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <RouterLink v-if="store.token == ''" class="nav-link" to="/login">Login</RouterLink>
            <a href="javascript:void(0)" v-else class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>

        <span class="navbar-text">
          {{ store.user.first_name ?? "" }}
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { store } from "@/store/store.js";
import router from "@/router/index.js";
import Security from "@/helpers/security.js";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    async logout() {
      const payload = {
        token: store.token,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        Security.requestOptions(payload),
      );
      const respData = await response.json();
      if (respData.error) {
        console.log(respData.message);
      } else {
        store.token = "";
        store.user = {};

        document.cookie =
          "_site_data=; Path=/; " +
          "SameSite=Strict; Secure; " +
          "Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        router.push("/login");
      }
    },
  },
};
</script>
