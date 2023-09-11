import {
    signInWithPopup,
    GithubAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInAnonymously,
    sendSignInLinkToEmail,
    GoogleAuthProvider,
    TwitterAuthProvider,
} from "firebase/auth";

import { settings } from "~/constants";
export const useAuth = () => {
    const loading = ref(false);
    const emailLinkLoading = ref(false);
    const router = useRouter();
    const auth = useFirebaseAuth();
    const toast = useToast();
    const signInWithGithub = () => {
        console.log("inside signinGithub ");
        const provider = new GithubAuthProvider();
        const auth = useFirebaseAuth();
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            console.log(
                "🚀 ~ file: Github.vue:31 ~ .then ~ credential:",
                credential
            );
            const token = credential.accessToken;
            console.log("🚀 ~ file: Github.vue:34 ~ .then ~ token:", token);
            // The signed-in user info.
            const user = result.user;
            console.log("🚀 ~ file: Github.vue:38 ~ .then ~ user:", user);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            router.push("/");
        });
    };

    const successToast = () => {
        toast.add({ title: "✅ Login Success" });
    };

    const errorToast = (error) => {
        toast.add({ title: error, color: "danger" });
    };

    const onSuccess = () => {
        successToast();
        router.push("/");
    };

    const onError = (error) => {
        console.error(error);
        errorToast(error.message);
    };

    const signup = (email, password) => {
        loading.value = true;
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                onError(error);
            })
            .finally(() => {
                loading.value = false;
            });
    };

    const signInRandom = () => {
        signInAnonymously(auth)
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                onError(error);
            });
    };

    const _signOut = () => {
        signOut(auth)
            .then(() => {
                toast.add({ title: "✅ Logout Success!" });
                router.push("/login");
            })
            .catch((error) => {
                console.error("error", error);
                toast.add({ title: error, color: "danger" });
            });
    };

    const sendLoginLinkInEmail = (email) => {
        emailLinkLoading.value = true;
        sendSignInLinkToEmail(auth, email, settings)
            .then(() => {
                toast.add({
                    title: "✅ Success",
                    description:
                        "Sign In Link has been sent to your email address. please check.",
                });
            })
            .catch((error) => {
                onError(error);
            })
            .finally(() => (emailLinkLoading.value = false));
    };

    const signInWithGoogle = () => {
        const googleAuthProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleAuthProvider)
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                onError(error);
            });
    };

    const signInWithTwitter = () => {
        const provider = new TwitterAuthProvider();

        signInWithPopup(auth, provider)
            .then(() => onSuccess())
            .catch((error) => onError(error));
    };
    return {
        github: {
            signIn: signInWithGithub,
        },
        google: {
            signIn: signInWithGoogle,
        },
        twitter: {
            signIn: signInWithTwitter,
        },
        signOut: _signOut,
        signup,
        loading,
        emailLinkLoading,
        signInRandom,
        sendLoginLinkInEmail,
    };
};
