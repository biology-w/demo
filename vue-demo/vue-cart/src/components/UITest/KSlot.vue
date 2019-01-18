<template>
    <div class="slot">
        <div class="header">head</div>
        <slot></slot>
        <slot name="one"></slot>
        <slot name="two"></slot>
        <div class="footer">foot</div>
    </div>
</template>

<script>
  export default {}
</script>

<style scoped>
    .slot {

    }

    .header {

    }

    .footer {

    }
</style>
