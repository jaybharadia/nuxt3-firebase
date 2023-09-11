<template>
    <UIcon :name="name" :class="sizeClass" />
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: "md",
        },
    },
    computed: {
        sizeClass() {
            switch (this.size) {
                case "sm":
                    return "text-base";
                case "md":
                    return "text-lg";
                case "lg":
                    return "text-xl";
                case "xl":
                    return "text-2xl";
            }
        },
    },
};
</script>

<style scoped></style>
