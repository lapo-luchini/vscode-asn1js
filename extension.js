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

const viewId = 'asn1js.view';
const viewTitle = 'ASN.1 decode';

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let panel = null;

    function setViewContent(panel) {
        const onDiskPath = vscode.Uri.joinPath(context.extensionUri, 'static/asn1js');
        const baseURI = panel.webview.asWebviewUri(onDiskPath);
        panel.webview.html = `<!DOCTYPE html>
            <html data-theme="dark">
            <head>
                <base href="${baseURI}/index.html">
                <meta name="theme-color" content="#0d1116" media="(prefers-color-scheme: dark)">
                <meta name="theme-color" content="#C0C0C0" media="(prefers-color-scheme: light)">
                <title>ASN.1 JavaScript decoder</title>
                <link rel="stylesheet" href="index.css" type="text/css">
                <link rel="icon" type="image/svg+xml" sizes="192x192" href="favicon.svg">
            </head>
            <body>
            <div id="contextmenu">
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
              <form style="display: none">
                  <textarea id="area" rows="8"></textarea>
                  <br>
                  <br>
                  <label title="can be slow with big files"><input type="checkbox" id="wantHex"> with hex dump</label>
                  <label title="can be slow with big files"><input type="checkbox" id="trimHex" checked="checked"> trim big chunks</label>
                  <label title="can be slow with big files"><input type="checkbox" id="wantDef" checked="checked"> with definitions</label>
                  <input id="butDecode" type="button" value="decode">
                  <input id="butClear" type="button" value="clear">
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
            </div>
            <script type="module" src="../indexVSCode.js"></script>
            </body>
            </html>`;
    }

    function createPanel() {
        if (panel) return;

        const cfg = vscode.workspace.getConfiguration('asn1js');
        console.log('Config', cfg);

        panel = vscode.window.createWebviewPanel(
            viewId,
            viewTitle,
            cfg.side ? vscode.ViewColumn.Two : vscode.ViewColumn.One,
            {
                enableScripts: true,
                // Only allow the webview to access resources in our extension's media directory
                localResourceRoots: [ vscode.Uri.joinPath(context.extensionUri, 'static') ],
            },
        );

        panel.onDidDispose(() => { panel = null; });

        setViewContent(panel);
    }

    function showContent(content) {
        createPanel();
        panel.reveal();
        panel.webview.postMessage({ command: 'decode', content });
    }

    class ViewSerializer {
        async deserializeWebviewPanel(oldPanel, state) {
            panel = oldPanel;
            panel.onDidDispose(() => { panel = null; });
            setViewContent(panel);
            panel.webview.postMessage({ command: 'decode', content: state.content });
        }
    }

    vscode.window.registerWebviewPanelSerializer(viewId, new ViewSerializer());

    context.subscriptions.push(vscode.commands.registerCommand('asn1js.decode', async function (url) {

        let content;

        if (url && url instanceof vscode.Uri) {
            content = await vscode.workspace.fs.readFile(url);
            content = Buffer.from(content).toString('binary');
            showContent(content);
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        if (editor.selection.isEmpty)
            content = editor.document.getText();
        else
            content = editor.document.getText(editor.selection);

        showContent(content);
    }));
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate,
};
