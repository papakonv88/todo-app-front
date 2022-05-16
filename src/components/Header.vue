<template>
  <b-container>
    <b-row class="headerCl" align-h="between">
      <b-col class="col-2 p-3 headerCl"
        ><b>{{ currentRoute }}</b></b-col
      >
      <b-col class="col-3 p-3 headerCl"
        ><b
          >Hi {{ user }} ! |
          <span @click="this.logOut" class="linkCl">Logout</span></b
        ></b-col
      >
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "./../router/index";

export default {
  name: "Header",
  components: {},
  data() {
    return {};
  },
  methods: {
      ...mapActions(["clearUser"]),
    logOut() {
      router.push({ name: "Login" });
      this.clearUser()
    },
  },
  computed: {
    ...mapGetters({
      user: "name",
    }),
    currentRoute() {
      let routeName = "";
      switch (this.$route.name) {
        case "Dashboard":
          routeName = "My Dashboard";
          break;
        case "Todos":
          routeName = "My Todos List";
          break;
        default:
          routeName = "";
      }
      return routeName;
    },
  },
  watch: {},
};
</script>

<style scoped>
.headerCl {
  color: black;
}

.linkCl {
  cursor: pointer;
}

.linkCl:hover {
  color: #6a737b;
}
</style>