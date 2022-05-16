<template>
  <div>
    <div class="d-flex justify-content-center flex-column vh-100 containerCol">
      <div class="d-flex justify-content-center">
        <div class="loginWrapper d-flex justify-content-center flex-column">
          <div class="align-self-center margins">
            <b :style="{fontSize: '22px'}">Login</b>
          </div>
          <div v-if="loginError" class="alert alert-danger">
            There was a problem with your login.
          </div>
          <b-form class="d-flex flex-column" @submit="onSubmit">
            <b-form-group
              class="margins"
              id="input-group-1"
              label="Your User Name:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="user"
                placeholder="Enter user name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              class="margins"
              id="input-group-2"
              label="Your password:"
              label-for="password"
            >
              <b-form-input
                id="password"
                type="password"
                v-model="password"
                placeholder="Enter password"
                required
              ></b-form-input>
            </b-form-group>
            <b-button
              style="backgroundcolor: #29afe1 !important"
              type="submit"
              variant="primary"
              ><b>Submit</b></b-button
            >
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapState, mapGetters } from "vuex";
import router from "./../router/index";

export default {
  name: "Login",
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["getUser"]),
    async onSubmit(event) {
      event.preventDefault();
     await this.getUser({
        email: this.user,
        password: this.password,
      });
    },
  },
  computed: {
    ...mapState({
      loginError: "loginError",
    }),
    ...mapGetters({
      token: "token",
    }),
  },
  watch: {
    token(val) {
      if (val) {
        router.push({ name: "Dashboard", params: { user: this.user } });
      }
    },
  },
  validations() {
    return {
      password: { required },
      user: { required },
    };
  },
};
</script>

<style scoped>
.loginWrapper {
  min-width: 350px;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #ECECEC;
  background-color: #ffffff;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

.margins {
  margin-bottom: 20px;
  text-align: left;
  font-weight: bold;
}

.containerCol {
  background-color: #FAFAFA;
}

.alert-danger {
  background-color: #fdf6f6;
  border-color: #de7575;
  color: #c20707;
}

.alert {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
}
</style>