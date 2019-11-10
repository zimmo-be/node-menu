module.exports = (uri) => (item) => {
    return item.href && item.href.replace(/^\/+|\/+$/g, '') === uri.replace(/^\/+|\/+$/g, '');
};
