export default defineEventHandler((event) => {
    const env = useRuntimeConfig();
    console.log("process env", env);
    return {
        hello: "world",
    };
});
