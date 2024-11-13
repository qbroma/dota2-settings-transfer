import { readdirSync } from 'fs';

export const isFolderEmpty = (dirPath) => {
    try {
        const files = readdirSync(dirPath);
        return files.length === 0;
    } catch (error) {
        console.error('Ошибка при проверке папки:', error);
        return false;
    }
};