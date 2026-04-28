// array global untuk menyimpan data barang
let dataBarang = []

// fungsi format rupiah 
function rupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

let indexEdit = -1
//fungsi untuk menyimpan data barang ke dalam array
function simpan() {
  const nama = document.getElementById("nama").value
  const harga = Number(document.getElementById("harga").value)
  const qty = Number(document.getElementById("qty").value)
  
  //buat objek barang
  const barang = {
    nama: nama,
    harga: harga,
    qty: qty
  }
  // tambah objek barang ke array
  dataBarang.push(barang)
  
  tampilkan()
  //reset atau bersihkan form
  bersihkan()
}

//fungsi untuk menampilkan data barang
function tampilkan() {
  let total = 0
  let html = ""
  
  // loop untuk membuat elemen HTML setiap item barang
  for (let i = 0; i < dataBarang.length; i++) {
    let barang = dataBarang[i]
    let subtotal = barang.harga * barang.qty
    total += subtotal
    
    html += `
    <div class="item">
    <h3>${i + 1}. ${barang.nama}</h3>
    <div class="info">Harga : Rp ${rupiah(barang.harga)}</div>
     <div class="info">Qty : ${barang.qty}</div>
      <div class="info">Subtotal : Rp ${rupiah(subtotal)}</div>
      <div class="action">
      <button class="tombolEdit" onclick="edit(${i})">Edit</button>
       <button class="tombolHapus" onclick="hapus(${i})">Hapus</button>
          </div>
        </div>
        `
  }
  
  html += `
        <div class="total">
            Total: Rp ${rupiah(total)}
        </div>
    `
  
  document.getElementById("hasil").innerHTML = html
}

function bersihkan() {
  document.getElementById('nama').value = ''
  document.getElementById('harga').value = ''
  document.getElementById('qty').value = 1
  
  modeSimpan()
}
//fungsi untuk menghapus item barang
function hapus(index) {
  dataBarang.splice(index, 1)
  tampilkan()
}
//fungsi untuk menampilkan data barang yg akan di edit
// menerima parameter index untuk mengetahui item mana yg akan di edit
function edit(index) {
  const barang = dataBarang[index]
  document.getElementById('nama').value = barang.nama
  document.getElementById('harga').value = barang.harga
  document.getElementById('qty').value = barang.qty
  
  indexEdit = index
  modeEdit()
}

function ubah() {
  //pastikan ada item yang sedang diedit
  if (indexEdit == -1) {
    alert("tidak ada item yang sedang di edit.")
    
    //hentikan fungsi jika tidak ada item yang sedang di edit
    return
  }
  
  //ambil nilai dari nilai input
  const nama = document.getElementById("nama").value
  const harga = Number(document.getElementById("harga").value)
  const qty = Number(document.getElementById("qty").value)
  //bersihkan form setelah mengambil nilai 
  //simpan perubahan data barang ke dalam array berdasarkan index yang sedang di edit
  dataBarang[indexEdit].nama = nama
  dataBarang[indexEdit].harga = harga
  dataBarang[indexEdit].qty = qty
  //reset index edit setelah perubahan disimpan
  indexEdit = -1
  
  // bersihkan form setelah mengambil nilai
  bersihkan()
  
  //tampilkan kembali data barang yang sudah di edit
  tampilkan()
  
  modeSimpan()
}

// fungsi untuk menonaktifkan tombol simpan dan aktifkan tombol update saat ada item yang sedang di edit
function modeEdit() {
  document.getElementById('tombolTambah').disabled = true
  document.getElementById('tombolUpdate').disabled = false
}
// fungsi untuk menonaktifkan tombol update dan aktifkan tombol simpan saat tidak ada item yang sedang di edit
function modeSimpan() {
  document.getElementById('tombolTambah').disabled = false
  document.getElementById('tombolUpdate').disabled = true
}