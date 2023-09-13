import {
    signInWithPopup,
    GithubAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInAnonymously,
    sendSignInLinkToEmail,
    GoogleAuthProvider,
    TwitterAuthProvider,
    signInWithEmailLink,
    isSignInWithEmailLink,
} from "firebase/auth";

const isProd = import.meta.env.PROD;

export const useAuth = () => {
    const loading = ref(false);
    const emailLinkLoading = ref(false);
    const router = useRouter();
    const auth = useFirebaseAuth();
    const toast = useToast();

    const {
        public: { deploymentUrl },
    } = useRuntimeConfig();
    const settings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: isProd
            ? `${deploymentUrl}/verify-email`
            : "http://localhost:3000/verify-email",
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
    };

    const signInWithGithub = () => {
        const provider = new GithubAuthProvider();
        const auth = useFirebaseAuth();
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);

            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
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

    // The client SDK will parse the code from the link for you.
    const verifyEmail = (email) => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            signInWithEmailLink(auth, email, window.location.href)
                .then(() => {
                    onSuccess();
                    // You can access the new user via result.user
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                })
                .catch((error) => {
                    console.error(
                        "🚀 ~ file: auth.js:126 ~ verifyEmail ~ error:",
                        error
                    );

                    onError(error);
                    router.push("/login");
                    // Some error occurred, you can inspect the code: error.code
                    // Common errors could be invalid email and invalid or expired OTPs.
                });
        }
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
        verifyEmail,
    };
};
