export const settings = {
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
