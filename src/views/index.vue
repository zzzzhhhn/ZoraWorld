<style scoped>

</style>
<template>
    <panel-menu></panel-menu>

</template>
<script>
    import panelMenu from '../components/panelMenu.vue';
    export default {
        components: {
            panelMenu
        },
        mounted() {

        },
        methods: {
            handleStart() {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            }
        }
    };
</script>