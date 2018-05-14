class MenuItem {
    constructor(label, {isCurrent = false, href, parent, children}) {
        this.label = label;
        this.isCurrent = isCurrent;
        this.href = href;
        this.parent = parent || null;
        this.children = [];
        if (children) {
            children.forEach(item => this.addChild(item.label, item));
        }
    }

    addChild(label, menu) {
        if (label instanceof MenuItem) {
            label.parent = this;
            this.children.push(label);
            return label;
        }

        const item = new MenuItem(label, Object.assign(menu, { parent: this }));
        this.children.push(item);
        return item;
    }
}

module.exports = MenuItem;