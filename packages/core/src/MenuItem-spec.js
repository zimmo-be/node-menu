import test from 'ava';
import MenuItem from './MenuItem';
import Sinon from 'sinon';

test('MenuItem:constructor', t => {
    const addChildStub = Sinon.spy(MenuItem.prototype, "addChild");
    const item = new MenuItem("root", {
        href: "/nl",
        children: [{
            label: 'child1'
        }]
    });
    t.is(item.href, "/nl");
    t.true(addChildStub.calledOnce);
    t.is(addChildStub.firstCall.args[0], "child1");
    addChildStub.restore();
});

test('MenuItem:addChild', t => {
    const item = new MenuItem("root", {
        href: "/nl",
        children: [{
            label: 'child1'
        }]
    });
    t.is(item.children.length, 1);
    t.is(item.children[0] instanceof MenuItem, true);
});
