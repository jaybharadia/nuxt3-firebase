export default defineEventHandler((event) => {
    const env = useRuntimeConfig();
    return {
        hello: "world",
    };
});
