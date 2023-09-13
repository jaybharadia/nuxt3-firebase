export const useArticles = async () => {
    const { $items } = useNuxtApp();
    const item = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                item: "asdasidjasdij2993293",
            });
        }, 1000);
    });

    return item;
};

export const useUser = async () => {
    const user = await new Promise(async (resolve) => {
        await useArticles();
        setTimeout(() => {
            resolve({
                name: "jay",
                age: 20,
            });
        }, 3000);
    });

    return user;
};
