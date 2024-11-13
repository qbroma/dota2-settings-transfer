import { cpSync } from 'fs';

export const copyFolder = (src, dest) => {
    cpSync(src, dest, { recursive: true });
};