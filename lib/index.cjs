/** @type {import('@yarnpkg/core/lib/Plugin').Plugin<import('@yarnpkg/core/lib/Plugin').Hooks>} */
module.exports = {
	name: 'yarn-plugin-if-present',
	factory: async (require) => {
		const argv = process.argv;
		const ifPresentIndex = argv.indexOf('--if-present');

		if (ifPresentIndex === -1) return {};

		const command = argv.slice(2).find(arg => arg !== 'run' && !arg.startsWith('-'))

		const { Manifest } = require('@yarnpkg/core');
		const manifest = await Manifest.find(process.cwd());
		if (!(command in manifest.scripts)) {
			console.warn(`Couldn't find a script named "${command}"`);
			process.exit(0);
		}
	},
};
