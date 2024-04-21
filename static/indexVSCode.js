import * as web from './index.js';

window.addEventListener('message', event => {
    const message = event.data;
    console.log('Received message', message);
    switch (message.command) {
    case 'decode':
        web.decodeText(message.content);
        break;
    }
});
