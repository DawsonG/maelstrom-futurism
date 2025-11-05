declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

// If you are importing regular SCSS files (not CSS Modules)
declare module "*.scss" {
    const content: Record<string, string>;
    export default content;
}