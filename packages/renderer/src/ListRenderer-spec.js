import test from 'ava';
import ListRenderer from './ListRenderer';
import { Menu, Matcher } from '@node-menu/core';

let  menu, servicesMenu, subMenu;
test.beforeEach(t => {
    menu = new Menu("test", [
        {
            label: "Home",
            href: "/"
        }
    ]);
    servicesMenu = menu.addChild("Service", { href: "/services" });
    subMenu = servicesMenu.addChild("Menu rendering", { href: "/services/rendering" });
});

test('ListRenderer / simple constructor', t => {
    const matcher = new Matcher();
    const renderer = new ListRenderer(matcher);
    t.is(renderer.render(menu), '<nav><ul><li class=""><a href="/">Home</a></li><li class="with-children"><a href="/services">Service</a><ul><li class=""><a href="/services/rendering">Menu rendering</a></li></ul></li></ul></nav>');
});

test('ListRenderer / with active submenu', t => {
    subMenu.isCurrent = true;
    const matcher = new Matcher();
    const renderer = new ListRenderer(matcher);
    t.is(renderer.render(menu), '<nav><ul><li class=""><a href="/">Home</a></li><li class="__ancestor with-children"><a href="/services">Service</a><ul><li class="__current"><a href="/services/rendering">Menu rendering</a></li></ul></li></ul></nav>');
});

test('ListRenderer / with active menu first level', t => {
    const matcher = new Matcher([(item) => item === servicesMenu]);
    const renderer = new ListRenderer(matcher);
    t.is(renderer.render(menu), '<nav><ul><li class=""><a href="/">Home</a></li><li class="__current with-children"><a href="/services">Service</a><ul><li class=""><a href="/services/rendering">Menu rendering</a></li></ul></li></ul></nav>');
});
test('ListRenderer / with custom classes', t => {
    const matcher = new Matcher([(item) => item === subMenu]);
    const renderer = new ListRenderer(matcher, {
        currentClass: "active",
        ancestorClass: "active"
    });
    t.is(renderer.render(menu), '<nav><ul><li class=""><a href="/">Home</a></li><li class="active with-children"><a href="/services">Service</a><ul><li class="active"><a href="/services/rendering">Menu rendering</a></li></ul></li></ul></nav>');
});
