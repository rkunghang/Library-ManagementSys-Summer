export const catchAsyncErrors = (func) => {
    return (req, res, next) => {
        promise.resolve(func(req, res, next)).catch(next);
    };
};