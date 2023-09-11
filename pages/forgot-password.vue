<template>
    <div class="flex justify-center self-center z-10">
        <div class="p-12 bg-white mx-auto rounded-3xl w-96">
            <div class="mb-7">
                <h3 class="font-semibold text-2xl text-gray-800">
                    Forgot Password
                </h3>
                <p class="text-xs text-gray-500">
                    No worries. We will send you signin link in your email.
                </p>
            </div>
            <div class="space-y-6">
                <div class="">
                    <UInput
                        placeholder="you@example.com"
                        icon="i-heroicons-envelope"
                        v-model="email"
                    />
                </div>

                <div>
                    <UButton
                        block
                        size="lg"
                        :loading="emailLinkLoading"
                        @click.native="sendLoginLinkInEmail(email)"
                        color="purple"
                        theme="solid"
                        icon="i-uil-arrow-right"
                        trailing
                        label="Get Email"
                    />
                </div>
                <Divider />
                <UButton
                    block
                    theme="soft"
                    color="gray"
                    label="Sign In"
                    @click.native="$router.push('/login')"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        definePageMeta({
            layout: "auth",
        });

        const { sendLoginLinkInEmail, emailLinkLoading } = useAuth();

        return {
            sendLoginLinkInEmail,
            emailLinkLoading,
        };
    },
    data() {
        return {
            email: "",
        };
    },
};
</script>

<style scoped></style>
