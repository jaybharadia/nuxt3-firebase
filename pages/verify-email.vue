<template></template>

<script>
export default {
    setup() {
        definePageMeta({
            layout: "auth",
        });
    },
    mounted() {
        const email = window.prompt(
            "Please enter your email address to continue signin"
        );

        if (email) {
            const { verifyEmail } = useAuth();

            verifyEmail(email);
        } else {
            this.$router.push("/login");
        }
    },
};
</script>

<style scoped></style>
