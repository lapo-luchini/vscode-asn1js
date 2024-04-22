const isDark = document.body.classList.contains('vscode-dark');
localStorage.setItem('theme', isDark ? 'dark' : 'light');

import * as web from './index.js';

const vscode = acquireVsCodeApi();

window.addEventListener('message', event => {
    const message = event.data;
    console.log('Received message', message);
    switch (message.command) {
    case 'decode':
        web.decodeText(message.content);
        vscode.setState({ content: message.content });
        break;
    }
});

const previousState = vscode.getState();
if (previousState)
    web.decodeText(previousState.content);
