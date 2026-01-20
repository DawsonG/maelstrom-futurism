type sizes =  'base' | 'xs' | 'sm' | 'normal' | 'md' | 'lg' | 'xl' | 'xxl';
type breakpoints = Omit<'base' | 'normal' | 'xl' | 'xxl', sizes>;
type height = 'bottom' | 'low' | 'sunk' | 'normal' | 'raised' | 'high' | 'top';
type color = 'background' | 'borderMuted' | 'border' | 'content' | 'textColor' | 
    'linkColor' | 'primary' | 'secondary' | 'alert' | 'warning' | 'success' |
    'info';

class Theme {
    readonly rootStyles: CSSStyleDeclaration;

    constructor() {
        // Run code to grab styles
        this.rootStyles = getComputedStyle(document.documentElement);
    }

    public size(name: sizes): string {
        return this.getStyleValue(`size-${name}`).trim();
    }

    public color(name: color): string {
        return this.getStyleValue(name).trim();
    }

    public bp(name: breakpoints): string {
        return this.getStyleValue(`bp-${name}`).trim();
    }

    public height(name: height): string {
        return this.getStyleValue(`height-${name}`).trim();
    }

    private getStyleValue(name:string): string {
        return this.rootStyles.getPropertyValue(`--${name}`).trim();
    }
}

export default Theme;