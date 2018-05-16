module.exports = class ListRenderer
{
    constructor(matcher, options = {}) {
        this.matcher = matcher;
        this.currentClass = options.currentClass || "__current";
        this.ancestorClass = options.ancestorClass || "__ancestor";
    }

    render(menu) {
        return `<nav>${this.renderChildren(menu.children)}</nav>`;
    }
    renderChildren(list) {
        const items = list.map(item => this.renderMenuItem(item)).join("");
        return `<ul>${items}</ul>`;
    }
    renderMenuItem(item) {
        let children = "";
        const itemClasses = this.getItemClasses(item);
        if (item.children.length > 0) {
            children = this.renderChildren(item.children);
        }
        return `<li class="${itemClasses.join(" ")}"><a href="${item.href}">${item.label}</a>${children}</li>`;
    }
    getItemClasses(item) {
        const itemClasses = [];
        if (this.matcher.isCurrent(item)) {
            itemClasses.push(this.currentClass);
        }
        if (this.matcher.isAncestor(item)) {
            itemClasses.push(this.ancestorClass);
        }

        if (item.children.length > 0) {
            itemClasses.push("with-children");
        }
        return itemClasses;
    }
};
