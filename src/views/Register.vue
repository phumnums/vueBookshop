<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="../assets/Logo.png"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        name="username"
        label="Username"
        id="username"
        v-model="registerForm.username"
        :rules="usernameRules"
        prepend-inner-icon="mdi-account-outline"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password
      </div>

      <v-text-field
        :type="visible ? 'text' : 'password'"
        name="password"
        label="Password"
        id="password"
        v-model="registerForm.password"
        :rules="passwordRules"
        prepend-inner-icon="mdi-lock-outline"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          By clicking Register, you agree to our
        </v-card-text>
      </v-card>

      <v-btn class="mb-8" color="primary" size="large" @click="PostRegister" block>
        Register
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
      },
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },


  methods: {
    // login() {
    //   this.$router.push("/");
    // },
    // register() {
    //   this.$router.push("/register");
    // },
    async PostRegister() {
      try {
        const {data} = await this.axios.post('http://localhost:3000/api/v1/register', this.registerForm,) 
          console.log(data);
          this.$router.push("/"); //login
      }catch (error) {
        console.log(error);
        alert('error')
      }
   },
  },

}
</script>

<style></style>
