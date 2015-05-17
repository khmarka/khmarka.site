
function ApiError (text) {
    this.text = text;
}
ApiError.prototype.toJson = function () {
    return {
        error: this.text
    }
};

module.exports = ApiError;