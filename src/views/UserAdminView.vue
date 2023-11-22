<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <h1 class="mt-3">User</h1>

        <hr />

        <FormTag @user-edit-event="submitHandler" name="userform" event="user-edit-event">
          <TextInput
            v-model="user.first_name"
            type="text"
            required="true"
            label="First Name"
            name="first-name"
          />

          <TextInput
            v-model="user.last_name"
            type="text"
            required="true"
            label="Last Name"
            name="last-name"
          />

          <TextInput v-model="user.email" type="email" required="true" label="Email" name="email" />

          <TextInput
            v-if="this.user.id === 0"
            v-model="user.password"
            type="password"
            required="true"
            label="Password"
            name="password"
          />

          <TextInput
            v-else
            v-model="user.password"
            type="password"
            label="Password"
            name="password"
          />

          <hr />

          <div class="float-start">
            <input type="submit" class="btn btn-primary me-2" value="Save" />
            <RouterLink to="/admin/users" class="btn btn-outline-secondary">Cancel</RouterLink>
          </div>
          <div class="float-end">
            <a
              v-if="this.user.id > 0 && this.user.id !== store.user.id"
              class="btn btn-danger"
              href="javascript:void(0)"
              @click="confirmDelete(this.user.id)"
            >
              Delete
            </a>
          </div>
          <div class="clearfix"></div>
        </FormTag>
      </div>
    </div>
  </div>
</template>

<script>
import Security from "@/helpers/security.js";
import FormTag from "@/components/forms/FormTag.vue";
import TextInput from "@/components/forms/TextInput.vue";
import { store } from "@/store/store.js";
import router from "@/router/index.js";
import notie from "notie";

export default {
  name: "UserAdminView",
  beforeMount() {
    Security.requireToken();

    this.user.id = parseInt(String(this.$route.params.userId), 10);

    if (this.user.id > 0) {
      // editing an existing user
      // TODO - get user from db
    }
  },
  data() {
    return {
      user: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      store,
    };
  },
  components: {
    FormTag,
    TextInput,
  },
  methods: {
    async submitHandler() {
      const payload = {
        id: this.user.id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/users/save`,
          Security.requestOptions(payload),
        );
        const respData = await response.json();
        if (respData.error) {
          notie.alert({
            type: "error",
            text: respData.message,
          });
        } else {
          notie.alert({
            type: "success",
            text: "Changes saved!",
          });
        }
      } catch (error) {
        notie.alert({
          type: "error",
          text: error,
        });
      }
    },
    async confirmDelete(userId) {},
  },
};
</script>
