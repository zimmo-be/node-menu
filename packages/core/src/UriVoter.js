module.exports = (uri) => (item) => {
    return item.href.replace(/^\/+|\/+$/g, '') === uri.replace(/^\/+|\/+$/g, '');
};
