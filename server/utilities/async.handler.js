
//Using asyncHandle we don't have require to use try-catch block
export const asyncHandler = (fun) => {
    return (req, res, next) => {
        Promise.resolve(fun(req, res, next))
            .catch(error => next(error));
    };
};
