const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };


// This is a higher-order function that takes a request handler function and returns a new function that wraps the original request handler function in a Promise.resolve() call. This allows us to use async/await syntax in our route handlers, and any errors thrown by the handler function will be caught and passed to the Express error handling middleware.








// const asyncHandler = (fun) => async (req, res, next) => {
//     try {
//         await fun(req, res, next);
//     } catch (err) {
//         next(err);
//     }
// }; 