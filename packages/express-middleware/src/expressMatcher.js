const {Matcher, UriVoter} = require("@node-menu/core");

const expressRenderer = () => {
    return (req, res) => {
        const uriVoter = new UriVoter(req.path);
        res.locals.menuMatcher = new Matcher([uriVoter]);
    }
};