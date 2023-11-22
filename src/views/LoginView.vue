<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Login</h1>
        <hr />
        <FormTag @submit-event="submitHandler" name="login-form" event="submit-event">
          <TextInput v-model="email" label="Email" type="email" name="email" required="true" />
          <TextInput
            v-model="password"
            label="Password"
            type="password"
            name="password"
            required="true"
          />
          <hr />
          <input type="submit" class="btn btn-primary" value="Login" />
        </FormTag>
      </div>
    </div>
  </div>
</template>

<script>
import FormTag from "@/components/forms/FormTag.vue";
import TextInput from "@/components/forms/TextInput.vue";
import { store } from "@/store/store.js";
import router from "@/router/index.js";
import notie from "notie";
import Security from "@/helpers/security.js";

export default {
  name: "LoginView",
  components: {
    FormTag,
    TextInput,
  },
  data() {
    return {
      email: "",
      password: "",
      store,
    };
  },
  methods: {
    async submitHandler() {
      const payload = {
        email: this.email,
        password: this.password,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/login`,
        Security.requestOptions(payload),
      );
      const respData = await response.json();

      if (respData.error) {
        notie.alert({
          type: "error",
          text: respData.message,
          // stay: true
          // position: 'bottom'
        });
      } else {
        store.token = respData.data.token.token;

        store.user = {
          id: respData.data.user.id,
          first_name: respData.data.user.first_name,
          last_name: respData.data.user.last_name,
          email: respData.data.user.email,
        };

        // save info to cookie
        let date = new Date();
        let expDays = 1;
        date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();

        // set the cookie
        document.cookie =
          "_site_data=" +
          JSON.stringify(respData.data) +
          "; " +
          expires +
          "; path=/; SameSite=strict; Secure;";
        router.push("/");
      }
    },
  },
};
</script>
