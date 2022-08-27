import chalk from "chalk";

export default class Logging {
    public static log = (args: any) => this.info(args);
    public static info = (args: any, namespace?: string) => console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] [${namespace}]`), typeof args === 'string' ? chalk.blueBright(args) : args);
    public static warn = (args: any, namespace?: string) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN] [${namespace}]`), typeof args === 'string' ? chalk.yellowBright(args) : args);
    public static error = (args: any, namespace?: string) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] [${namespace}]`), typeof args === 'string' ? chalk.redBright(args) : args);
}