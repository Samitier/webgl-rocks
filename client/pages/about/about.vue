<template>
</template>

<script>
    import { AboutWebgl } from './about.webgl.js'

    export default {
        components: {
        },
        created() {
            let webgl = new AboutWebgl()
        }
    }
</script>