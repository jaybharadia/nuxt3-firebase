<template>
    <UButton>{{ label }}</UButton>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: "Submit",
        },
    },
};
</script>

<style scoped></style>
