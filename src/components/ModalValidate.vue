<template>
  <Modal 
    title="Modal with form"
    @close="$emit('close')">
    <div slot="body">
        <form @submit.prevent="onSubmit">
            <div class="form-item" :class="{'errorInput': $v.name.$error}">
                <label>Name:</label>
                <p class="errorText" v-if="!$v.name.required">Field is required!</p>
                <p class="errorText" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}}!</p>
                <input type="text" 
                    v-model.trim="name"
                    :class="{'error': $v.name.$error}"
                    @change="$v.name.$touch()">  
            </div>
            <div class="form-item" :class="{errorInput: $v.email.$error}">
                <label>Email:</label>
                <p class="errorText" v-if="!$v.email.required">Field is required!</p>
                <p class="errorText" v-if="!$v.email.email">Email is not correct.</p>
                <input type="email" v-model.trim="email" @change="$v.email.$touch()">
            </div>
            <button class="btn btnPrimary">Submit!</button>
        </form>
    </div>
    </Modal>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import Modal from '../components/UI/Modal';

export default {
    components: {Modal},
    data() {
        return {
            name: '',
            email: ''
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        email: {
            required,
            email
        }
    },
    methods: {
        onSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid){
                const user = {
                    name: this.name,
                    email: this.email
                }
                this.name = '';
                this.email = '';
                this.$v.$reset();
                console.log(user);
                this.$emit('close');
            }
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