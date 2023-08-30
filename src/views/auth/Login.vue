<template>
    <h1> Ingresar </h1>

    {{ usuario }}
    <form @submit="funIngresar">
        <label for="">Ingrese Correo</label>
        <input type="email" v-model="usuario.email">
        {{ errores.email }}
        <br>
        <label for="">Ingrese Contraseña</label>
        <input type="password" v-model="usuario.password">
        {{ errores.password }}
        <br>
        <input type="submit">
    </form>
</template>

<script setup>
    import { ref } from 'vue'
    import authService from "@/service/AuthService.js"
    import { useRouter } from 'vue-router';
    import ability from '../../casl/ability'


    const usuario = ref({email: "", password: ""})
    const errores = ref({})
    const router = useRouter();

    const funIngresar = async (e) => {
        e.preventDefault();

        errores.value = {}
        
        try {
            const {data} = await authService.login(usuario.value);

            console.log(data);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("permisos", JSON.stringify(data.usuario.permisos));

            // ability.update(data.usuario.permiso)     

            router.push({name: 'Admin'});

        } catch (error) {
        console.log("ERROR EN COMPONENTE LOGIN", error)
        console.log(error)
        if(error.response.data.errors){
            errores.value = error.response.data.errors
        }else{
            alert("Error Backend : " +error.response.data.mensaje)
        }
    }
    }
</script>