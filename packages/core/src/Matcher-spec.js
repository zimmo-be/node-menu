import test from 'ava';
import Menu from './Menu';
import Matcher from './Matcher';

test('Matcher', t => {
    const rootMenu = new Menu("root");
    const child1stLevel = rootMenu.addChild("English", {href: "/en"});
    const child2ndLevel = child1stLevel.addChild("About us", {href: "/en/about"});
    const child3rdLevel = child2ndLevel.addChild("Sales team", {href: "/en/about/sales"});

    const voter = (item) => item === child3rdLevel;
    const matcher = new Matcher([voter]);
    t.is(matcher.isCurrent(child1stLevel), false);
    t.is(matcher.isCurrent(child2ndLevel), false);
    t.is(matcher.isCurrent(child3rdLevel), true);
    t.is(matcher.isAncestor(child1stLevel), true);
    t.is(matcher.isAncestor(child2ndLevel), true);
    t.is(matcher.isAncestor(child3rdLevel), false);
});
