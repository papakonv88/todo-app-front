<template>
  <div class="d-flex justify-content-center flex-column topMargin">
    <router-link
      class="routeCl"
      :to="{ name: 'Dashboard', params: { user: this.name } }"
      >Dashboard</router-link
    >
    <router-link
      class="routeCl"
      :to="{ name: 'Todos', params: { user: this.name } }"
      >Todos</router-link
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  components: {},
  data() {
    return {};
  },
  methods: {
  
  },
  computed: {
    ...mapGetters({
      name: "name",
    }),
  },
  watch: {},
};
</script>

<style scoped>
.topMargin {
  margin-top: 30px;
}

.routeCl {
  display: block;
  text-decoration: none;
  padding: 10px;
  font-weight: 600;
  color: #b2b4b8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.routeCl:hover {
  opacity: 0.7;
  cursor: pointer;
  background-color: rgba(85, 85, 85, 0.5);
}

.routeHolder {
  height: 30px;
}

.router-link-exact-active {
  background-color: #555555;
}
</style>