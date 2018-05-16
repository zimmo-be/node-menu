const MenuItem = require("./MenuItem");
class Menu {
    constructor(name, items) {
        this.name = name;
        this.children = [];
        if (items) {
            items.map(item => this.addChild(item.label, item));
        }
    }

    addChild(label, menu = {}) {
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

module.exports = Menu;