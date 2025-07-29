const Umkm = require('../models/Umkm');

function validateParams(obj, params) {
  for (const key of params) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}

exports.getAllUmkm = async (req, res) => {
  const data = await Umkm.find({}, 'gambar namaUmkm pemilik kontak');
  res.json(data);
};

exports.getDetailUmkm = async (req, res) => {
  const { id } = req.params;
  const data = await Umkm.findById(id);
  if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
  res.json(data);
};

exports.createUmkm = async (req, res) => {
  const required = ["namaUmkm", "pemilik", "deskripsi", "alamat", "kontak", "mapsUrl"];
  if (!validateParams(req.body, required)) {
    return res.status(400).json({ message: "Semua parameter harus tercantum: namaUmkm, pemilik, deskripsi, alamat, kontak, mapsUrl" });
  }
  const { namaUmkm, pemilik, deskripsi, alamat, kontak, mapsUrl } = req.body;
  const gambar = req.file?.path || '';
  const umkm = new Umkm({ namaUmkm, pemilik, deskripsi, alamat, kontak, mapsUrl, gambar });
  await umkm.save();
  res.json({ message: 'Data ditambahkan' });
};

exports.updateUmkm = async (req, res) => {
  const { id } = req.params;
  const required = ["namaUmkm", "pemilik", "deskripsi", "alamat", "kontak", "mapsUrl"];
  if (!validateParams(req.body, required)) {
    return res.status(400).json({ message: "Semua parameter harus tercantum: namaUmkm, pemilik, deskripsi, alamat, kontak, mapsUrl" });
  }
  const { namaUmkm, pemilik, deskripsi, alamat, kontak, mapsUrl } = req.body;
  const gambar = req.file?.path;

  const data = await Umkm.findById(id);
  if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });

  data.namaUmkm = namaUmkm;
  data.pemilik = pemilik;
  data.deskripsi = deskripsi;
  data.alamat = alamat;
  data.kontak = kontak;
  data.mapsUrl = mapsUrl;
  if (gambar) data.gambar = gambar;

  await data.save();
  res.json({ message: 'Data diupdate' });
};

exports.deleteUmkm = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: 'Data tidak ditemukan' });
  const deleted = await Umkm.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Data tidak ditemukan' });
  res.json({ message: 'Data dihapus' });
};