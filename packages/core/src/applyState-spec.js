import test from 'ava';
import applyState from './applyState';
import Menu from "./Menu";
import Matcher from "./Matcher";

test('applyState', t => {
    const rootMenu = new Menu("root");
    const child1stLevel = rootMenu.addChild("English", { href: "/en" });
    const anotherChild1stLevel = rootMenu.addChild("Dutch", { href: "/nl" });
    const child2ndLevel = child1stLevel.addChild("About us", { href: "/en/about" });

    const voter = (item) => item === child2ndLevel;
    const matcher = new Matcher(voter);
    applyState(rootMenu, matcher);

    t.is(child1stLevel.isCurrent, false);
    t.is(child1stLevel.isAncestor, true);
    t.is(child1stLevel.hasChildren, true);
    t.is(child2ndLevel.isCurrent, true);
    t.is(child2ndLevel.isAncestor, false);
    t.is(child2ndLevel.hasChildren, false);
    t.is(anotherChild1stLevel.isCurrent, false);
    t.is(anotherChild1stLevel.isAncestor, false);
});
