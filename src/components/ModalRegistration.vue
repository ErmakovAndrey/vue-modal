<template>
  <Modal 
    title="Registration"
    @close="close">
    <div slot="body">
        <form @submit.prevent="onSubmit">
            <div class="form-item" :class="{errorInput: $v.email.$error}">
                <label>Email:</label>
                <p class="errorText" v-if="!$v.email.required">Field is required!</p>
                <p class="errorText" v-if="!$v.email.email">Email is not correct.</p>
                <input type="email" v-model.trim="email" @change="$v.email.$touch()">
            </div>
            <div class="form-item" :class="{errorInput: $v.password.$error}">
                <label>Password:</label>
                <p class="errorText" v-if="!$v.password.required">Field is required!</p>
                <p class="errorText" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}}!</p>
                <input type="password" v-model.trim="password" @change="$v.password.$touch()">
            </div>
            <div class="form-item" :class="{errorInput: $v.repeatPassword.$error}">
                <label>Repeat password:</label>
                <p class="errorText" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical!</p>
                <input type="password" v-model.trim="repeatPassword" @change="$v.repeatPassword.$touch()">
            </div>
            <button class="btn btnPrimary">Submit!</button>
        </form>
    </div>
    </Modal>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import Modal from '../components/UI/Modal';

export default {
    components: {Modal},
    data() {
        return {
            email: '',
            password: '',
            repeatPassword: ''
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        },
        repeatPassword: {
            sameAsPassword: sameAs('password')
        }
    },
    methods: {
        onSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid){
                const user = {
                    email: this.email,
                    pasword: this.password
                }
                console.log(user);
                this.close();
            }
        },
        close() {
            this.$v.$reset();
            this.email = '';
            this.password = '';
            this.repeatPassword = '';
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss">
.form-item .errorText{
    display: none;
    font-size: 0.7em;
    margin-bottom: 0.5em;
    color: #de4040 !important;
}
.form-item.errorInput .errorText{
    display: block;
}
input.error{
    border-color:#de4040;
}
</style>