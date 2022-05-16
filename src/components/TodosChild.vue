<template>
  <layout>
    <template slot="header">
      <Header />
    </template>
    <template v-if="todos" slot="main">
      <b-container fluid>
        <b-row class="todoMain" align-h="center">
          <b-col class="todo" cols="8">
            <b-row class="p-3 rowSt addTodo">
              <b-col cols="10">
                <b-row class="justify-content-center">
                  <b-col sm="1" align-self="center">
                    <label><b>Todo:</b></label>
                  </b-col>
                  <b-col align-self="center" sm="9">
                    <b-form-input
                      id="type-text"
                      v-model="newTodo"
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="2" align-self="center"
                ><b-button @click="addMe">Add</b-button></b-col
              >
            </b-row>
            <b-row class="p-3 rowSt" v-if="isEdit">
              <b-col cols="10">
                <b-row class="justify-content-center">
                  <b-col sm="1" align-self="center">
                    <label><b>Edit:</b></label>
                  </b-col>
                  <b-col align-self="center" sm="9">
                    <b-form-input
                      id="type-text"
                      v-model="selectedTodo.text"
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="2" align-self="center"
                ><b-button @click="saveMe">Save</b-button></b-col
              >
            </b-row>
            <b-row class="rowSt">
              <b-col cols="9 p-3"><b>Text</b></b-col>
              <b-col cols="1 p-3"><b>Edit</b></b-col>
              <b-col cols="1 p-3"><b>Delete</b></b-col>
            </b-row>
            <b-row class="rowSt" v-for="todo in todos" :key="todo['_id']">
              <b-col cols="9 p-3"
                ><b>{{ todo.text }}</b></b-col
              >
              <b-col cols="1 p-3"
                ><b-icon
                  class="btnTodo"
                  @click="editMe(todo)"
                  icon="pencil-fill"
                ></b-icon
              ></b-col>
              <b-col cols="1 p-3"
                ><b-icon
                  class="btnTodo"
                  @click="deleteMe(todo)"
                  icon="trash"
                ></b-icon
              ></b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </layout>
</template>

<script>
import Layout from "./../views/Layout.vue";
import Header from "./Header.vue";
import { mapGetters, mapState, mapActions } from "vuex";
import router from "./../router/index";

export default {
  name: "TodosChild",
  components: {
    Layout,
    Header,
  },
  data() {
    return {
      selectedTodo: null,
      isEdit: false,
      todosIni: null,
      newTodo: ""
    };
  },
  methods: {
    ...mapActions(["deleteTodo", "updateTodo", "addTodo"]),
    async deleteMe(todo) {
      await this.deleteTodo(todo["_id"]);
    },
    editMe(todo) {
      this.selectedTodo = todo;
      this.isEdit = !this.isEdit;
    },
    async saveMe() {
      this.isEdit = false;
      await this.updateTodo(this.selectedTodo);
    },
    async addMe() {
      await this.addTodo({
        text: this.newTodo,
      });
      this.newTodo = "";
      this.$emit('update')
    },
  },
  computed: {
    ...mapState(['todos', 'serverError']),
    ...mapGetters({
      token: "token",
      user: "name",
      todosNew: "todosAll"
    })
  },
  watch: {
    serverError(val) {
      if (val) {
        alert("Cannot complete operation, please try again..");
      }
    }
  },
  mounted() {
    if (!this.token) {
      router.push({ name: "Login" });
    }
  },
};
</script>

<style scoped>
.todoMain {
  margin-top: 50px;
}

.todo {
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

.rowSt {
  border: 1px solid #ececec;
  background-color: white;
}

.btnTodo:hover {
  opacity: 0.7;
  cursor: pointer;
}

.addTodo {
  margin-bottom: 30px;
}
</style>