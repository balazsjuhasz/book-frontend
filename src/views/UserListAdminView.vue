<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <h1 class="mt-3">All Users</h1>
      </div>

      <hr />

      <table class="table table-compact table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in this.users" :key="user.id">
            <td>
              <RouterLink :to="`/admin/users/${user.id}`">
                {{ user.last_name }}, {{ user.first_name }}
              </RouterLink>
            </td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Security from "@/helpers/security.js";
import notie from "notie";
import { RouterLink } from "vue-router";

export default {
  name: "UserListAdminView",
  data() {
    return {
      users: [],
    };
  },
  async beforeMount() {
    Security.requireToken();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        Security.requestOptions(""),
      );
      const respData = await response.json();
      if (respData.error) {
        notie.alert({
          type: "error",
          text: respData.message,
        });
      } else {
        this.users = respData.data.users;
      }
    } catch (error) {
      notie.alert({
        type: "error",
        text: error,
      });
    }
  },
  components: { RouterLink },
};
</script>
