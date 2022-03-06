const util = require("util");
const exec = require("child_process").exec;
const execAwait = util.promisify(exec);

function getArgScript() {
	// CLI args
	const args = process.argv.slice(2);

	// Bootstap commands (react-start build | start)
	const scriptIndex = args.findIndex((x) => x === "build" || x === "start");
	let script = scriptIndex === -1 ? args[0] : args[scriptIndex];

	if (scriptIndex === -1) {
		script = "build";
		console.warn("WARN: Invalid command (expects build | start)");
		console.warn('WARN: Falling back to "build" command');
		console.warn("");
	}

	return script;
}

// Bootstrap runs code before react start/build.
// Injects ENV array into cross-env before running script
async function bootstrap(env, script, path) {
	try {
		// Build ENV string
		const envString = buildENV(env);

		// Run react-scripts command
		runStream(`npx cross-env ${envString} react-scripts ${script}`, path);
	} catch (error) {
		console.error("[bootstrap]", error);
	}
}

// Shortens a string at both ends, separated by '...', eg '123456789' -> '12345...789'
function shorten(str, numCharsStart = 6, numCharsEnd = 4) {
	if (str?.length <= 11) return str;
	return `${str.substring(0, numCharsStart)}...${str.slice(
		str.length - numCharsEnd
	)}`;
}

// Handles ENV array and build a string to use
function buildENV(env = []) {
	if (env.length < 1) return "";

	console.log("Building ENV to inject:");

	// Build ENV string
	let envString = "";
	env.forEach((item, index) => {
		if (index > 0) envString += ` `;
		const envPair = `${item[0]}=${item[1]}`;
		envString += envPair;
		console.log("  ", index, envPair);
	});

	console.log("");

	return envString;
}

// Execute OS commands, awaits response from stdout
async function run(command, path = __dirname) {
	try {
		const { stdout, stderr } = await execAwait(command, { cwd: path });
		return stdout?.trim();
	} catch (e) {
		console.error("[run]", e); // Should contain code (exit code) and signal (that caused the termination).
	}
}

// Execute OS commands, awaits response from stdout
function runStream(command, path = __dirname) {
	const process = exec(command, { cwd: path });

	process.stdout.on("data", (data) => {
		console.log(data.toString());
	});

	process.stderr.on("data", (data) => {
		console.error(data.toString());
	});

	process.on("exit", (code) => {
		console.log(
			"[runStream] Child process exited with code " + code.toString()
		);

		if (code !== 0) {
			console.log("ERROR, process finished with a non-zero code");
			process.exit(1);
		}
	});
}

module.exports = {
	getArgScript,
	bootstrap,
	shorten,
	buildENV,
	run,
	runStream,
};
