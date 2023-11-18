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
import FormTag from "@/components/FormTag.vue";
import TextInput from "@/components/forms/TextInput.vue";

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
    };
  },
  methods: {
    async submitHandler() {
      console.log("submitHandler called - success!");

      const payload = {
        email: this.email,
        password: this.password,
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
      };

      const response = await fetch("http://localhost:8081/users/login", requestOptions);
      const data = await response.json();

      if (data.error) {
        console.log("Error:", data.message);
      } else {
        console.log(data);
      }
    },
  },
};
</script>
