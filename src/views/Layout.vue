<template>
  <b-container fluid>
    <b-row class="headerCont">
      <b-col class="headerCl">
        <slot name="header"></slot>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="colCl sidebar">
        <Sidebar />
      </b-col>
      <b-col cols="10" class="colMain colCl">
        <slot name="main"></slot>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "Layout",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
  },
  watch: {},
};
</script>

<style scoped>
.headerCl {
  height: 65px;
  box-shadow: 0 4px 2px -2px gray;
  z-index: 10;
}

.colCl {
  height: calc(100vh - 65px);
}

.colMain {
  background-color: #fafafa;
}

.sidebar {
  border-right: 2px solid #ECECEC;
  min-width: 100px;
  padding: 0px !important;
  background-color: #181e25;
}

.headerCont {
    background-color: #F3F5F7;
}
</style>