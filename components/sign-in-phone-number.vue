<template>
    <div>
        <UButton
            label="Sign In With Phone Number"
            block
            color="gray"
            @click.native="signInPhone"
        />

        <div id="sign-in-button"></div>
    </div>
</template>

<script>
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default {
    setup() {
        const auth = useFirebaseAuth();

        const signInPhone = () => {
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, "+918104515329", appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    // ...
                })
                .catch((error) => {
                    console.log("🚀 ~ .then ~ error:", error);
                    // Error; SMS not sent
                    // ...
                });
        };

        return {
            signInPhone,
            auth,
        };
    },
    mounted() {
        try {
            console.log("🚀 ~ mounted ~ this.auth:", this.auth);

            window.recaptchaVerifier = new RecaptchaVerifier(
                this.auth,
                "sign-in-button",
                {
                    size: "invisible",
                    callback: (response) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        // this.signInPhone();
                    },
                }
            );
            console.log("window ", window.recaptchaVerifier);
        } catch (error) {
            console.log(error);
        }
    },
    methods: {},
};
</script>
