import { writeFileSync } from 'node:fs';

export const saveJson = (src, data) => writeFileSync(src, JSON.stringify(data));