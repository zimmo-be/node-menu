module.exports = class Matcher
{
    constructor(voters = []) {
        this.voters = voters;
    }
    isCurrent(item) {
        if (item.isCurrent) {
            return true;
        }
        for (const voter of this.voters) {
            if (voter && voter(item)) {
                return true;
            }
        }
        return false;
    }
    isAncestor(item) {
        for (const child of item.children) {
            if (this.isCurrent(child) || this.isAncestor(child)) {
                return true;
            }
        }
        return false;
    }
}