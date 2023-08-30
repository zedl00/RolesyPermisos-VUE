<template>
    <h1>Layout Principal </h1>

    <Router-link to="/admin">Admin </Router-link> |
    <Router-link to="/admin/usuario">Usuario</Router-link> |
    <RouterView />
</template>


<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>