function applyState(menu, matcher) {
    menu.children.forEach(item => {
        Object.assign(item, {
            isCurrent: matcher.isCurrent(item),
            isAncestor: matcher.isAncestor(item),
            hasChildren: item.children.length > 0
        });
        applyState(item, matcher);
    })
}
module.exports = applyState;
