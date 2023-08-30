<template>
    <h1>Gestion de Usuarios</h1>

    {{ ability }}
    
    <!-- {{ usuarios }} -->

    <div>
        <div>
            <label for="">Ingresar Nombre</label>
            <input type="text" v-model="usuario.name">
            <br>
            <label for="">Ingresar Correo</label>
            <input type="email" v-model="usuario.email">
            <br>
            <label for="">Ingresar Password</label>
            <input type="password" v-model="usuario.password">
            <br>
            <button type="button" @click="guardarUsuario()">Guardar Usuario</button>
        </div>
    
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>CORREO</th>
                    <th>CREADO EN</th>
                    <th>GESTION</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in usuarios" :key="u.id">
                    <td>{{ u.id }}</td>
                    <td>{{ u.name }}</td>
                    <td>{{ u.email }}</td>
                    <td>{{ u.created_at}}</td>
                    <td>
                        <button type="button" @click="editarUsuario(u)" v-if="$can('delete', 'user')">Editar</button>
                        <button type="button" @click="eliminarUsuario(u)" v-if="$can('delete', 'user')">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup>
    // importaciones
    import { Ability } from "@casl/ability";
    import { ref, onMounted } from "vue";
    import usuarioService from "./../../../service/UsuarioService.js";
    // import ability from "../../../casl/ability";
    
    // import { useAbility } from '@casl/vue';
    // const { can } = useAbility();
    
    // declaracion de variables o estados
    const usuarios = ref([]);
    const usuario = ref({name: "", email: "", password: ""});

    // ciclo de vida de un componente
    onMounted(() => {
        getUsuarios();
    });
    
    // metodos o funciones
    const getUsuarios = async () => {
        const { data } = await usuarioService.listar();
        usuarios.value = data.data;
    };

    const guardarUsuario = async () => {
        
        if (usuario.value.id) {
            await usuarioService.modificar(usuario.value.id, usuario.value)
        }else {
            await usuarioService.guardar(usuario.value);
        }

        usuario.value = {name: "", email: "", password: ""}
        getUsuarios();
    }

    const editarUsuario = async (us) => {
        usuario.value = us
    }

    const eliminarUsuario = async (us) => {
        if(confirm("Esta Seguro que desea eliminar Usuario")) {
            try{
                await usuarioService.eliminar(us.id);
                getUsuarios();
            } catch (error) {
                console.log(error);
            }
        }
    }

</script>