<template>
  <layout>
    <template slot="header">
     <Header />
    </template>
    <template slot="main">
      <div v-if="todos" class="d-flex">
        <div v-if="todos.length > 1" class="m-3 p-4 todosTotal">
          <b>You have {{ this.todos.length }} todos</b>
        </div>
        <div v-else class="m-3 p-4 todosTotal">
          <b>You have {{ this.todos.length }} todo</b>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from "./../views/Layout.vue";
import Header from './Header.vue';
import { mapGetters, mapActions, mapState } from "vuex";
import router from "./../router/index";

export default {
  name: "Dashboard",
  components: {
    Layout,
    Header
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getTodos"]),
  },
  computed: {
    ...mapState({
      todos: "todos",
      serverError: "serverError"
    }),
    ...mapGetters({
      token: "token",
      user: "name"
    }),
  },
  watch: {
    serverError(val) {
      if (val) {
        alert("Cannot complete operation, please try again..");
      }
    },
  },
  async mounted() {
    if (!this.token) {
      router.push({ name: "Login" });
    }
    await this.getTodos();
  },
};
</script>

<style scoped>
.todosTotal {
  background-color: #FAFAFA;
  border-radius: 10px;
  box-shadow: 0 10px 10px 0 rgb(0 0 0 / 20%), 0 3px 14px 0 rgb(0 0 0 / 19%) !important;
}

.todosTotal:hover {
  opacity: 0.8;
}
</style>