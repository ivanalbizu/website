<template>
    <time>{{require('moment')(time).format('DD MMM YYYY')}}</time>
</template>

<script>
export default {
    props: {
        time: Date
    }
}
</script>

<style></style>