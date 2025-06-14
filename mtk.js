function hitung() {
  var jariJari = parseFloat(document.getElementById("pi").value);
  if (!isNaN(jariJari)) {
  var luas = 3.14 * jariJari * jariJari;
  var keliling = 2 * 3.14 * jariJari;
  document.getElementById("luas").innerHTML = "Luas: " + luas.toFixed(2);
  document.getElementById("keliling").innerHTML = "Keliling: " + keliling.toFixed(2);
  } else {
    document.getElementById("luas").innerHTML = "Luas: Masukkan nilai jari-jari!";
    document.getElementById("keliling").innerHTML = "Keliling: Masukkan nilai jari-jari!";
    
  }
  }

 function pitagoras() {
      var a = parseFloat(document.getElementById("a").value);
      var b = parseFloat(document.getElementById("b").value);
      if (!isNaN(a) && !isNaN(b)) {
        var c = Math.sqrt(a * a + b * b);
        document.getElementById("hasilPitagoras").innerHTML = "Panjang sisi miring (c): " + c.toFixed(2);
      } else {
        document.getElementById("hasilPitagoras").innerHTML = "Masukkan nilai a dan b!";
      }
    }
function kecepatan(){
  var jarak = parseFloat(document.getElementById("jarak").value);
  var waktu = parseFloat(document.getElementById("waktu").value);
  if (!isNaN(jarak) && !isNaN(waktu) && waktu != 0) {
    let jam = waktu / 60;
    var hasil = jarak / jam;
    document.getElementById("kecepatannyaadalah").innerHTML = "Kecepatan: " + hasil.toFixed(2) + " km/jam";
} else {
    document.getElementById("kecepatannyaadalah").innerHTML = "Masukkan jarak dan waktu!";} 
  }
