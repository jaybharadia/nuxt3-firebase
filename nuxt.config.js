// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    colorMode: {
        preference: "light",
    },
    ui: {
        icons: ["uil", "heroicons"],
    },
    runtimeConfig: {
        OPEN_API_KEY: "asdadaoadjij22",
        public: {
            WEATHER_KEY: "asdjiadij",
        },
    },
    devtools: {
        enabled: true,
    },
    image: {
        // Nuxt Image Module config
        domains: ["products.7span.in"],
        provider: "ipx",
        presets: {
            avatar: {
                modifiers: {
                    format: "jpg",
                    width: 50,
                    height: 50,
                },
            },
        },
    },
    modules: ["@nuxt/image-edge", "nuxt-vuefire", "@nuxthq/ui"],
    vuefire: {
        auth: true,
        config: {
            apiKey: "AIzaSyA-uP0OI612B4j3TGl64fnYbPBcZFIuaos",
            authDomain: "metal-density-390112.firebaseapp.com",
            projectId: "metal-density-390112",
            storageBucket: "metal-density-390112.appspot.com",
            messagingSenderId: "139735434129",
            appId: "1:139735434129:web:b53742d2d384bbd4dbd030",
            measurementId: "G-F1XTG8XG4J",
            // there could be other properties depending on the project
        },
    },
});
