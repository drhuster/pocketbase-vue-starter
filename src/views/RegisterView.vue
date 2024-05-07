<template>
  <main>
    <article>
      <header>
        <h1>Register</h1>
      </header>

      <form @submit="register">
        <label>
          Username:
          <input v-model="username" required />
        </label>
        <label>
          Email:
          <input
            v-model="email"
            autocomplete="email"
            required
            placeholder="ex. email@email.com"
          />
        </label>

        <label>
          Password:
          <input v-model="password" type="password" required />
        </label>
        <label>
          Confirm Password:
          <input v-model="confirmPassword" type="password" required />
        </label>
        <p class="error" v-if="!registerSuccess">
          Failed to register as this time.
        </p>
        <div v-if="!registering">
          <button type="submit">Register</button>
          <RouterLink to="/login">Login</RouterLink>
        </div>
        <span v-else aria-busy="true">Registering...</span>
      </form>
    </article>
  </main>
</template>

<script setup>
import { ref } from "vue";
import router from "../router";
import { useStore } from "vuex";
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const registerSuccess = ref(true);
const registering = ref(false);

const store = useStore();

const register = async (e) => {
  e.preventDefault();
  registerSuccess.value = true;
  registering.value = true;
  try {
    registerSuccess.value = await store.dispatch("register", {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  } catch (error) {
    registerSuccess.value = false;
  }
  registering.value = false;

  if (registerSuccess.value) {
    router.push("/login");
  }
};
</script>

<style scoped>
main {
  min-height: 82vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  margin-right: 20px;
}
</style>
