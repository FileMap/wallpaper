import {promisify} from 'node:util';
import childProcess from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execFile = promisify(childProcess.execFile);

// Binary source → https://github.com/sindresorhus/windows-wallpaper

export async function getWallpaper({libraryPath=''} = {}) {
	const arguments_ = [
		'get',
	];
	const binary = path.resolve(__dirname, libraryPath, 'windows-wallpaper-x86-64.exe');

	const {stdout} = await execFile(binary, arguments_);
	return stdout.trim();
}

export async function setWallpaper(imagePath, {scale = 'fill'} = {}) {
	if (typeof imagePath !== 'string') {
		throw new TypeError('Expected a string');
	}

	const arguments_ = [
		'set',
		path.resolve(imagePath),
		'--scale',
		scale,
	];

	await execFile(binary, arguments_);
}
