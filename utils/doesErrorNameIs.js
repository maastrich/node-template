module.exports = function doesErrorNameIs(name, error) {
    return error.toString() === 'Error: ' + name ? true : false;
}