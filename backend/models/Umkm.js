const mongoose = require('mongoose');

const umkmSchema = new mongoose.Schema({
  namaUmkm: String,
  pemilik: String,
  deskripsi: String,
  alamat: String,
  kontak: String,
  mapsUrl: String,
  gambar: String
});

module.exports = mongoose.model('Umkm', umkmSchema);
