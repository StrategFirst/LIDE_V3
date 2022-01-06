let count_id = 0;

class Logger {

	static now() {
		const d = new Date();
		return `[ ${d.getDate().toString().padStart(2,'0')}/${(d.getMonth() + 1).toString().padStart(2,'0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')} ${d.getSeconds().toString().padStart(2,' ')}' ]`;
	}

	constructor() {
		this.ID = ( count_id = ( count_id + 1 ) % 9999 );

		Object.keys( console ).filter( fnName => ['log','error'].indexOf( fnName ) == -1 ).forEach( fonction => this[ fonction ] = console[ fonction ] );
	}

	log( ...k ) { return console.log(
		'LOG',
		Logger.now(),
		`{${this.ID}}`,
		...k
	); }

	error( ...k ) { return console.error(
		'ERR',
		Logger.now(),
		`{${this.ID}}`,
		...k
	); }

}

module.exports = Logger;

