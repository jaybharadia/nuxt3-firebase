export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("items", {
        name: "itemapi",
        call: "yes",
    });
});
