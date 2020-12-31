export const keyGenerator = (codeLength=15) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz0123456789_';

    return [...Array(codeLength)].reduce(acc => {
        const index = Math.floor(Math.random() * chars.length);
        return acc += chars[index];
    },"");
};

