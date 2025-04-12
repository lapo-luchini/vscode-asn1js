const
    outDir = 'static/asn1js',
    fs = require('fs'),
    Zip = require('adm-zip'),
    skipFiles = /[.]md$|[.]html$|[.]sh$|^test[.]js$|^examples[/]/;

async function main() {
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(outDir);
    let buffer = Buffer.from(await (await fetch('https://asn1js.eu/asn1js.zip')).arrayBuffer());
    let zip = new Zip(buffer);
    zip.getEntries().forEach(function(entry) {
        console.log(entry.entryName);
        if (skipFiles.test(entry.entryName)) return;
        fs.writeFileSync(outDir + '/' + entry.entryName, zip.readFile(entry));
    });
}

main();
