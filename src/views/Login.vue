<template>
  <div>
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
          v-model="loginForm.username"
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
          v-model="loginForm.password"
          :rules="passwordRules"
          prepend-inner-icon="mdi-lock-outline"
        ></v-text-field>

        <v-card class="mb-12" color="surface-variant" variant="tonal"> </v-card>

        <v-btn
          class="mb-8"
          color="primary"
          size="large"
          @click="PostLogin()"
          block
        >
          Log In
        </v-btn>

        <v-card-text class="text-center">
          <a class="text-blue text-decoration-none" 
          @click="register">
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    async PostLogin() {
      try {
        const {data} = await this.axios.post('http://localhost:3000/api/v1/login', this.loginForm,)
        localStorage.setItem("access_token", data.access_token);
        // localStorage.setItem("refresh_token", data.refresh_token);
        console.log(data);
        this.$router.push("/home");

        // if(this.loginForm.username === data.username && this.loginForm.password === data.password) {
        //   localStorage.setItem("user", data.username);
        //   localStorage.setItem("access_token", data.access_token);
        //   localStorage.setItem("refresh_token", data.refresh_token);
        //   console.log(data);
        //   this.$router.push("/home");
        // } else {
        //   alert("Username or Password is incorrect");
        // }
      }catch (error) {
        console.log(error);
        alert('error')
      }
    //   login() {
    //   if (this.username === "admin") {
    //     localStorage.setItem("user", "admin");
    //     localStorage.setItem("Token", "123456");
    //     this.$router.push("/home");
    //   } else alert("login failed");
    // },
    // register() {
    //   this.$router.push("/register");
    // },
    },
    login() {
        this.$router.push("/home");
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style></style>
