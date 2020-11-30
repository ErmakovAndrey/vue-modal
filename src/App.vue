<template>
  <div class="wrapper">
    <header></header>

    <div class="wrapper-content">
      <section>
        <div class="container">
          <!-- First modal -->
          <button class="btn btnPrimary" @click="modalFirst = !modalFirst">
            Show first modal
          </button>
          <Modal v-show="modalFirst" title="Title" @close="modalFirst = false">
            <div slot="body">
              <p>Text text</p>
              <button class="btn btnPrimary" @click="modalFirst = !modalFirst">
                Done!
              </button>
            </div>
          </Modal>

          <!-- Second modal -->
          <button
            class="btn btnPrimary"
            @click="modalSecond.show = !modalSecond.show"
          >
            Show form modal
          </button>
          <Modal
            v-show="modalSecond.show"
            title="Modal with form"
            @close="modalSecond.show = false"
          >
            <div slot="body">
              <form @submit.prevent="submitSecondForm">
                <label>Name:</label>
                <input type="text" required v-model="modalSecond.name" />
                <label>Email:</label>
                <input type="email" v-model="modalSecond.email" />
                <button class="btn btnPrimary">Submit!</button>
              </form>
            </div>
          </Modal>

          <!-- modal with validate -->
          <button
            class="btn btnPrimary"
            @click="modalValidate = !modalValidate"
          >
            Show form with validate modal
          </button>
          <ModalValidate
            v-show="modalValidate"
            @close="modalValidate = false"
          />
        </div>
      </section>

      <section>
        <div class="container">
          <!-- modal login -->
          <button
            class="btn btnPrimary"
            @click="modalLogin = !modalLogin"
          >
            Login
          </button>
          <ModalLogin
            v-show="modalLogin"
            @close="modalLogin = false"
            @showRegistration="modalRegistration = !modalRegistration"
          />

          <!-- modal regitration -->
          <button
            class="btn btnPrimary"
            @click="modalRegistration = !modalRegistration"
          >
            Registration
          </button>
          <ModalRegistration
            v-show="modalRegistration"
            @close="modalRegistration = false"
          />
        </div>
      </section>
    </div>

    <footer></footer>
  </div>
</template>

<script>
import Modal from "./components/UI/Modal.vue";
import ModalValidate from "./components/ModalValidate.vue";
import ModalLogin from "./components/ModalLogin.vue";
import ModalRegistration from "./components/ModalRegistration.vue";

export default {
  components: { Modal, ModalValidate, ModalLogin, ModalRegistration},
  data() {
    return {
      modalFirst: false,
      modalSecond: {
        show: false,
        name: "",
        email: "",
      },
      modalValidate: false,
      modalLogin: false,
      modalRegistration: false,
    };
  },
  methods: {
    submitSecondForm() {
      console.log({
        name: this.modalSecond.name,
        email: this.modalSecond.email,
      });
      this.modalSecond.name = "";
      this.modalSecond.email = "";
      this.modalSecond.show = false;
    },
  },
};
</script>

<style>
p {
  margin-bottom: 1em;
}
</style>
