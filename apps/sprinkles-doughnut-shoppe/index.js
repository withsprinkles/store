export default {
    fetch(request, env) {
        // Serve static assets for all requests
        return env.ASSETS.fetch(request);
    },
};
