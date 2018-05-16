const {Matcher, UriVoter} = require("@node-menu/core");

module.exports = () => {
    return (req, res) => {
        const uriVoter = new UriVoter(req.path);
        res.locals.menuMatcher = new Matcher([uriVoter]);
    }
};