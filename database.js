const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("gene_annotations.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite Database");
    }
});

db.run(`
CREATE TABLE IF NOT EXISTS annotations(
    geneId TEXT PRIMARY KEY,
    geneName TEXT NOT NULL,
    organism TEXT NOT NULL,
    chromosomeNumber TEXT NOT NULL,
    functionalAnnotation TEXT NOT NULL
)
`);

module.exports = db;