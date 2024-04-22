// ASN.1 JavaScript decoder VSCode extension
// Copyright (c) 2024 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let panel = null;

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "asn1js" is now active!');

    function createPanel() {
        if (panel) return;

        panel = vscode.window.createWebviewPanel(
            'asn1js.view', // Identifies the type of the webview. Used internally
            'ASN.1 decode', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in.
            {
                enableScripts: true,
                // Only allow the webview to access resources in our extension's media directory
                localResourceRoots: [ vscode.Uri.joinPath(context.extensionUri, 'static') ],
            },
        );

        panel.onDidDispose(() => { panel = null; });

        const onDiskPath = vscode.Uri.joinPath(context.extensionUri, 'static');
        const baseURI = panel.webview.asWebviewUri(onDiskPath);

        panel.webview.html = `<!DOCTYPE html>
            <html>
            <head>
                <title>ASN.1 JavaScript decoder</title>
                <base href="${baseURI}/index.html">
                <link rel="stylesheet" href="index.css" type="text/css" id="theme-base">
                <link rel="icon" type="image/svg+xml" sizes="192x192" href="favicon.svg">
            </head>
            <body>
            <div id="contextmenu">
                <button id="btnHideTree">Hide subtree</button>
                <button id="btnCopyHex">Copy hex dump</button>
                <button id="btnCopyB64">Copy Base64</button>
                <button id="btnCopyTree">Copy subtree</button>
                <button id="btnCopyValue">Copy value</button>
            </div>
            <div id="main-page">
                <div>
                    <div id="dump"></div>
                    <div id="tree"></div>
                </div>
            </div>
            <form style="display: none">
                <textarea id="area" rows="8"></textarea>
                <br>
                <br>
                <label title="can be slow with big files"><input type="checkbox" id="wantHex"> with hex dump</label>
                <label title="can be slow with big files"><input type="checkbox" id="trimHex" checked="checked"> trim big chunks</label>
                <label title="can be slow with big files"><input type="checkbox" id="wantDef" checked="checked"> with definitions</label>
                <input id="butDecode" type="button" value="decode">
                <input id="butClear" type="button" value="clear">
                <select id="theme-select">
                    <option value="os">OS Theme</option>
                    <option value="dark">Dark Theme</option>
                    <option value="light">Light Theme</option>
                </select>
                <br><br>
                <table>
                <tr><td>Drag or load file:</td><td><input type="file" id="file"></td></tr>
                <tr><td>Load examples:</td><td>
                    <select id="examples">
                    </select>
                    <input id="butExample" type="button" value="load"><br>
                </td></tr>
                <tr><td>Definitions:</td><td><select id="definitions"></select></td></tr>
                </table>
                <select id="tags"><option>[select tag]</option></select>
            </form>
            <script type="module" src="indexVSCode.js"></script>
            </body>
            </html>`;
    }

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('asn1js.decode', function () {
        // The code you place here will be executed every time your command is executed

        createPanel();

        const editor = vscode.window.activeTextEditor;
        if (editor)
            panel.webview.postMessage({ command: 'decode', content: editor.document.getText() });
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate,
};
