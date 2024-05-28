# VSCode ASN1js

Using this extension you can decode ASN.1 data directly in your editor.

## Features

When you have an editor open with ASN.1 content (in either a PEM armor, or raw Base64, or raw hexadecimal) you can decode it by using the "ASN.1 decode" command.

![example usage](https://asn1js.eu/vscode-asn1js.gif)

## TODO

- This document is currently incomplete
- Add tests to this extension

## Developer installation

You can test (and develop) this extension locally with the following commands:

```sh
$ git clone https://github.com/lapo-luchini/vscode-asn1js.git
$ cd vscode-asn1js/static
$ wget https://asn1js.eu/asn1js.zip
$ unzip asn1js.zip
$ rm -rf asn1js.zip examples index-local.html
```

You can now open the folder in VSCode and press F5 to execute a new VSCode session which includes the extension.

## Known Issues

- Hex view is maybe too much with low width

## Release Notes

Users appreciate release notes as you update your extension.

### 0.1.4
- Properly ignore files
- Remove old "hide subtree" menu option

### 0.1.3
- Fix missing files

### 0.1.2
- New tree mode

### 0.1.1
- Initial release

---
