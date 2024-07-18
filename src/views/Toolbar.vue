<template>
  <div>
    <v-toolbar dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title style="cursor: pointer" @click="$router.push('/home')">BookShop</v-toolbar-title>

      <v-spacer></v-spacer>

      
      <v-btn icon>
        
        <v-icon @click="$router.push('/admin')">mdi-account</v-icon>
        
      </v-btn>
    </v-toolbar>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
