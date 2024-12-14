const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./connection'); // Pastikan file `connection.js` Anda benar
const response = require('./response'); // Jika tidak digunakan, Anda bisa menghapus ini

// Middleware
app.use(bodyParser.json());



// Endpoint untuk mendapatkan daftar perusahaanv
app.get('/companies', (req, res) => {
  db.query('SELECT * FROM companies', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Endpoint untuk menambah perusahaan
app.post('/companies', (req, res) => {
  const newCompany = req.body;
  db.query('INSERT INTO companies SET ?', newCompany, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ id: results.insertId, ...newCompany });
  });
});

// Endpoint untuk mendapatkan daftar snack berdasarkan ID perusahaan
app.get('/snacks', (req, res) => {
  const companyId = req.query.company_id;
  db.query('SELECT * FROM snacks WHERE company_id = ?', [companyId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Endpoint untuk menambah snack baru
app.post('/snacks', (req, res) => {
  const newSnack = req.body;
  db.query('INSERT INTO snacks SET ?', newSnack, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ id: results.insertId, ...newSnack });
  });
});

// Endpoint untuk mengedit snack
app.put('/snacks/:id', (req, res) => {
  const snackId = req.params.id;
  const updatedSnack = req.body;
  db.query('UPDATE snacks SET ? WHERE id = ?', [updatedSnack, snackId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Snack updated', affectedRows: results.affectedRows });
  });
});

// Endpoint untuk menghapus snack
app.delete('/snacks/:id', (req, res) => {
  const snackId = req.params.id;
  db.query('DELETE FROM snacks WHERE id = ?', [snackId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Snack deleted', affectedRows: results.affectedRows });
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`API server berjalan di http://localhost:${port}`);
});
