<template>
    <div class="flex justify-center self-center z-10">
        <div class="p-12 bg-white mx-auto rounded-3xl w-96">
            <div class="mb-7">
                <h3 class="font-semibold text-2xl text-gray-800">Sign In</h3>
            </div>
            <div class="space-y-6">
                <div>
                    <UInput
                        placeholder="you@example.com"
                        icon="i-heroicons-envelope"
                        v-model="email"
                    />
                </div>

                <UInput
                    icon="i-heroicons-envelope"
                    placeholder="*******"
                    type="password"
                    v-model="password"
                />

                <div class="flex items-center justify-between">
                    <div class="text-sm ml-auto">
                        <NuxtLink
                            to="/forgot-password"
                            class="text-purple-700 hover:text-purple-600"
                        >
                            Forgot your password?
                        </NuxtLink>
                    </div>
                </div>
                <div>
                    <UButton
                        block
                        size="lg"
                        :loading="loading"
                        @click.native="signup(email, password)"
                        color="purple"
                        theme="solid"
                        icon="i-uil-arrow-right"
                        trailing
                        label="Sign In"
                    />
                </div>
                <Divider />
                <div class="flex justify-center gap-5 w-full">
                    <FbIcon
                        class="cursor-pointer"
                        name="i-uil-google"
                        @click.native="google.signIn"
                    />
                    <FbIcon
                        class="cursor-pointer"
                        name="i-uil-github"
                        @click.native="signInWithGithub()"
                    />
                    <FbIcon
                        class="cursor-pointer"
                        name="i-uil-twitter"
                        @click.native="twitter.signIn"
                    />
                </div>

                <Divider />

                <SignInPhoneNumber />

                <UButton
                    label="Sign In Anonymously"
                    block
                    color="gray"
                    @click.native="signInRandom"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Divider from "~/components/_divider.vue";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";

export default {
    setup() {
        definePageMeta({
            layout: "auth",
        });
        const {
            signup,
            loading,
            github: { signIn: signInWithGithub },
            google,
            signInRandom,
            twitter,
        } = useAuth();

        return {
            signInWithGithub,
            google,
            signup,
            loading,
            signInRandom,
            twitter,
        };
    },
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {},
};
</script>
