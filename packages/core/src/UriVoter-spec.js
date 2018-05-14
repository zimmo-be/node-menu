import test from 'ava';
import UriVoter from './UriVoter';

test('UriVoter', t => {
    t.is(typeof UriVoter("/nl"), "function");
    const voter = UriVoter("/en");
    t.is(voter({ href: "/en" }), true);
    t.is(voter({ href: "/en/about" }), false);
    t.is(voter({ href: "/nl" }), false);
    t.is(voter({ href: "" }), false);
    t.is(voter({ href: "/" }), false);
});
