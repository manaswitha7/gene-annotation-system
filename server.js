const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));


// =====================
// ADD RECORD
// =====================
app.post("/annotations", (req, res) => {

    const {
        geneId,
        geneName,
        organism,
        chromosomeNumber,
        functionalAnnotation
    } = req.body;

    const sql = `
    INSERT INTO annotations
    VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            geneId,
            geneName,
            organism,
            chromosomeNumber,
            functionalAnnotation
        ],
        function(err) {

            if (err) {
                return res.status(400).json({
                    message: "Gene ID already exists"
                });
            }

            res.json({
                message: "Gene added successfully"
            });
        }
    );
});


// =====================
// GET ALL RECORDS
// =====================
app.get("/annotations", (req, res) => {

    db.all(
        "SELECT * FROM annotations",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.json(rows);
        }
    );
});


// =====================
// UPDATE RECORD
// =====================
app.put("/annotations/:geneId", (req, res) => {

    const id = req.params.geneId;

    const {
        geneName,
        organism,
        chromosomeNumber,
        functionalAnnotation
    } = req.body;

    const sql = `
    UPDATE annotations
    SET geneName=?,
        organism=?,
        chromosomeNumber=?,
        functionalAnnotation=?
    WHERE geneId=?
    `;

    db.run(
        sql,
        [
            geneName,
            organism,
            chromosomeNumber,
            functionalAnnotation,
            id
        ],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Gene not found"
                });
            }

            res.json({
                message: "Gene updated successfully"
            });
        }
    );
});


// =====================
// DELETE RECORD
// =====================
app.delete("/annotations/:geneId", (req, res) => {

    const id = req.params.geneId;

    db.run(
        "DELETE FROM annotations WHERE geneId=?",
        [id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Gene not found"
                });
            }

            res.json({
                message: "Gene deleted successfully"
            });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});