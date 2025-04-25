# VSCode ASN1js

Using this extension you can decode ASN.1 data directly in your editor.

## Features

When you have an editor open with ASN.1 content (in either a PEM armor, or raw Base64, or raw hexadecimal) you can decode it by using the "ASN.1 decode" command. By right-clicking the explorer view, you can also decode binary (DER and BER) files.

![example usage](https://asn1js.eu/vscode-asn1js.gif)

## TODO

- This document is currently incomplete
- Add tests to this extension

## Developer installation

You can test (and develop) this extension locally with the following commands:

```sh
$ git clone https://github.com/lapo-luchini/vscode-asn1js.git
$ cd vscode-asn1js
$ node prepublish
```

You can now open the folder in VSCode and press F5 to execute a new VSCode session which includes the extension.

## Known Issues

- Hex view is maybe too much with low width

## Release Notes

### 0.2.2 (2025-04-25)
- Decode window is now properly shown on restart
- Open decode window to the side by default
- Add configuration option to keep opening window in current column
- Add configuration option to force decode on all file extensions

### 0.2.1 (2025-04-17)
- Decode files with right click from explorer
- Properly support binary files (e.g. DER)

### 0.2.0 (2025-04-12)
- Update to asn1js 2.0.5
- Improve dependency packaging method

### 0.1.4 (2024-05-28)
- Properly ignore files
- Remove old "hide subtree" menu option

### 0.1.3 (2024-05-28)
- Fix missing files

### 0.1.2
- New tree mode

### 0.1.1 (2024-04-23)
- Initial release

---
