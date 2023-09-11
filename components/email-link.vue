<template>
    <div>
        <UFormGroup name="email" label="Email">
            <UInput
                placeholder="you@example.com"
                icon="i-heroicons-envelope"
                v-model="email"
        /></UFormGroup>

        <UButton label="Get Email" color="gray" @click="send">
            <template #trailing>
                <UIcon name="i-heroicons-arrow-right-20-solid" />
            </template>
        </UButton>
    </div>
</template>

<script>
import { sendSignInLinkToEmail } from "firebase/auth";
export default {
    setup() {
        const email = ref("jay.p.b@7span.com");
        const auth = useFirebaseAuth();

        const settings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: "http://localhost:3000/",
            // This must be true.
            handleCodeInApp: true,
            iOS: {
                bundleId: "com.example.ios",
            },
            android: {
                packageName: "com.example.android",
                installApp: true,
                minimumVersion: "12",
            },
            dynamicLinkDomain: "localhost22.page.link",
        };

        const send = () => {
            sendSignInLinkToEmail(auth, email.value, settings)
                .then(() => {
                    alert("Email Link Sent for login");
                })
                .catch((error) => {
                    console.error(error);
                    alert("ERROR while sending email");
                });
        };
        return {
            email,
            send,
        };
    },
};
</script>

<style scoped></style>
