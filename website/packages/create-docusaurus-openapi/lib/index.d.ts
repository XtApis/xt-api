export default function init(rootDir: string, siteName?: string, reqTemplate?: string, cliOptions?: Partial<{
    useNpm: boolean;
    skipInstall: boolean;
    typescript: boolean;
}>): Promise<void>;
