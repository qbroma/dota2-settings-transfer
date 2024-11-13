import { readFileSync } from 'node:fs';

export const readJson = (src) => {
    try {
        const data = readFileSync(src, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Ошибка чтения или парсинга JSON из файла ${src}:`, error);
        return null;
    }
};