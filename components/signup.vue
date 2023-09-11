<template>
    <div>
        <UFormGroup name="email" label="Email">
            <UInput
                placeholder="you@example.com"
                icon="i-heroicons-envelope"
                v-model="email"
            />
        </UFormGroup>

        <UFormGroup name="password" label="Password">
            <UInput
                icon="i-heroicons-envelope"
                placeholder="*******"
                type="password"
                v-model="password"
            />
        </UFormGroup>

        <UButton label="Sign Up" color="gray" @click="signup">
            <template #trailing>
                <UIcon name="i-heroicons-arrow-right-20-solid" />
            </template>
        </UButton>
    </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
export default {
    setup() {
        const email = ref("jay@7span.com");
        const password = ref("1234567890");
        const auth = useFirebaseAuth();

        const signup = () => {
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then(() => {
                    alert("User Created");
                })
                .catch((error) => {
                    console.error(error);
                    alert("ERROR while creating USER");
                });
        };
        return {
            email,
            password,
            signup,
        };
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped></style>
