// Auth0 configuration
const auth0Config = {
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};

export {auth0Config}