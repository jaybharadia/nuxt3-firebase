<template>
    <div>
        <pre>User is {{ user }}</pre>

        <UButton label="Sign In Anonymously" color="gray" @click="signin">
            <template #trailing>
                <UIcon name="i-heroicons-arrow-right-20-solid" />
            </template>
        </UButton>

        <div>
            <UButton label="Upgrade Account" color="gray" @click="upgrade">
                <template #trailing>
                    <UIcon name="i-heroicons-arrow-right-20-solid" />
                </template>
            </UButton>
        </div>
    </div>
</template>

<script>
import {
    signInAnonymously,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
export default {
    setup() {
        const auth = useFirebaseAuth();

        const user = useCurrentUser();

        const googleUser = ref(null);
        const credential = ref(null);

        const googleAuthProvider = new GoogleAuthProvider();

        const signin = () => {
            signInAnonymously(auth)
                .then(() => {
                    alert("Anonymous login success");
                })
                .catch(() => {
                    alert("Error");
                });
        };

        const upgrade = () => {
            signinPopup();
        };

        const signinPopup = () => {
            signInWithPopup(auth, googleAuthProvider)
                .then((user) => {
                    console.log(
                        "🚀 ~ file: SignInRandom.vue:55 ~ .then ~ user:",
                        user
                    );
                    googleUser.value = user.user;

                    credential.value = GoogleAuthProvider.credential(
                        user.getAuthResponse().id_token
                    );

                    linkWithCredential(googleUser.value, credential.value)
                        .then((usercred) => {
                            const user = usercred.user;
                            alert("Anonymous account successfully upgraded");
                            console.log(
                                "Anonymous account successfully upgraded",
                                user
                            );
                        })
                        .catch((error) => {
                            console.log(
                                "Error upgrading anonymous account",
                                error
                            );
                        });

                    alert("Login with Google Success");
                })
                .catch((reason) => {
                    console.error("Failed sign", reason);
                    error.value = reason;
                });
        };

        return {
            signin,
            upgrade,
        };
    },
};
</script>

<style scoped></style>
