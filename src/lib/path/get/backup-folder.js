import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { TOOL_NAME } from '../../../contants.js';
import { APPDATA_ENV } from '../../env/constants.js';

export const getBackupFolder = () => {
    const folderPath = join(APPDATA_ENV, TOOL_NAME, 'backups');

    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
    }

    return folderPath;
};

