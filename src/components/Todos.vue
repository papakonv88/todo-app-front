<template>
 <TodosChild :key="refresh" @update="updateKey" />
</template>

<script>
import TodosChild from "./TodosChild.vue";

export default {
  name: "Todos",
  components: {
  TodosChild
  },
  data() {
    return {
      refresh: 1
    };
  },
  methods: {
   updateKey() {
     this.refresh++ // prospatheia gia na emfanistei to neo todo, den vlepo to state.todos update an den allaxo component
   },
  },
  computed: {
  },
  watch: {
 
  }
};
</script>

<style scoped>

</style>