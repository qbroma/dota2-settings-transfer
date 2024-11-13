import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { TOOL_NAME } from '../../../contants.js';
import { APPDATA_ENV } from '../../env/constants.js';

export const getToolFolder = () => {
    const toolFolder = join(APPDATA_ENV, TOOL_NAME);

    if (!existsSync(toolFolder)) {
        mkdirSync(toolFolder);
    }

    return toolFolder;
};