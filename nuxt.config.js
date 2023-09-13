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
            deploymentUrl: process.env.DEPLOYMENT_URL,
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
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASUREMENT_ID,
            // there could be other properties depending on the project
        },
    },
});
