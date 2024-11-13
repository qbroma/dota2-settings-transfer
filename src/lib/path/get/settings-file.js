import { existsSync, mkdirSync } from 'fs';
import { writeFileSync } from 'node:fs';
import { join } from 'path';
import { TOOL_NAME } from '../../../contants.js';
import { APPDATA_ENV } from '../../env/constants.js';

export const getSettingsFile = () => {
    const folderPath = join(APPDATA_ENV, TOOL_NAME, 'settings');

    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
    }

    const filePath = join(folderPath, 'main.json');

    if (!existsSync(filePath)) {
        writeFileSync(filePath, JSON.stringify({ isIntroQuestionAnswered: false }));
    }


    return filePath;
};