/**
 * Entrypoint for Angular2 application
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

export function main() {
	document.removeEventListener('DOMContentLoaded', main);
	return platformBrowserDynamic()
		.bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
	main();
} else {
	document.addEventListener('DOMContentLoaded', main);
}
