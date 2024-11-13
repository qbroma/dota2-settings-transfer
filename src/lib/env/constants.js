import { getAppDataEnv } from './get/app-data.js';
import { getProgramFilesX86Env } from './get/program-files-x86.js';

export const APPDATA_ENV = getAppDataEnv();
export const PROGRAM_FILES_X86_ENV = getProgramFilesX86Env();