<template>
    <Title>Post Page</Title>
    <div class="text-pink-400 text-lg">Inside POST PAGE</div>

    <div>DATA {{ data }}</div>

    <AddToCart />
</template>

<script>
export default {
    async setup() {
        const { data, pending, error, refresh } = await useFetch(
            "https://jsonplaceholder.typicode.com/posts/4",
            {
                pick: ["title"],
            }
        );
        return {
            data,
        };
    },
};
</script>

<style scoped></style>
