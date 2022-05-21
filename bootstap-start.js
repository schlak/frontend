const core = require("./scripts/bootstrap/core");
const packageJSON = require("./package.json");

const path = __dirname;
const script = core.getArgScript();

// Run bootrap
bootstrap();

// Bootstrap runs code before react start/build.
// Run anything you like, here we get the app version from the package.json + the current commit hash.
// prettier-ignore
async function bootstrap() {
    const gitCommitHash = await core.run(`git rev-parse HEAD`, path, process.env.REACT_APP_GIT_COMMIT);
    const gitCommitHashShort = gitCommitHash ? core.shorten(gitCommitHash) : null;
    const appVersion = packageJSON?.version;

    // Set ENV array to inject, key/value
    const env = [
        ["REACT_APP_VERSION", appVersion],
        ["REACT_APP_GIT_COMMIT", gitCommitHashShort],
        ["REACT_APP_HOST", process.env.REACT_APP_HOST],
        ["REACT_APP_API", process.env.REACT_APP_API],
        ["REACT_APP_HTTP", process.env.REACT_APP_HTTP],
    ];

    core.bootstrap(env, script, path);
}
