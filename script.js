// Kullanıcıdan alınan verileri sunucuya POST isteği ile gönderir.
function addData() {
    // Kullanıcı tarafından girilen verileri alır.
    var eng_Write = document.getElementById('eng_Write').value;
    var tr_Write = document.getElementById('tr_Write').value;
    var eng_Read = document.getElementById('eng_Read').value;

    // Sunucuya POST isteği gönderir.
    fetch('/add', {
        method: 'POST', // HTTP metodunu belirler.
        headers: {
            'Content-Type': 'application/json' // İstek gövdesinin JSON formatında olduğunu belirtir.
        },
        body: JSON.stringify({
            eng_Write: eng_Write, // Kullanıcıdan alınan verileri JSON formatına çevirir.
            tr_Write: tr_Write,
            eng_Read: eng_Read
        })
    })
    .then(response => response.json()) // Sunucudan gelen yanıtı JSON formatında işler.
    .then(data => {
        alert(data.message); // Sunucudan gelen mesajı kullanıcıya gösterir.
        queryData(); // Verileri güncellemek için queryData fonksiyonunu çağırır.
    })
    .catch(error => console.error('Ekleme hatası:', error)); // Hata durumunda hatayı konsola yazar.
}

// Sunucudan veri çekerek HTML tablo içinde gösterir.
function queryData() {
    fetch('/query') // Sunucuya GET isteği gönderir.
    .then(response => response.json()) // Yanıtı JSON formatında işler.
    .then(data => {
        let result = document.getElementById('result'); // Sonuçların gösterileceği HTML elemanını alır.
        result.innerHTML = ''; // Mevcut içeriği temizler.

        let table = document.createElement('table'); // Bir tablo elemanı oluşturur.
        table.style.border = '1px solid grey'; // Tabloya stil ekler.
        table.style.width = '100%';

        let headerRow = document.createElement('tr'); // Tablo başlık satırını oluşturur.
        let headers = ['ID', 'ENG_WRITE', 'TR_WRITE', 'ENG_READ', 'ACTIONS']; // Başlık isimlerini belirler.
        headers.forEach(header => {
            let th = document.createElement('th'); // Her bir başlık için th elemanı oluşturur.
            th.textContent = header; // Başlık metnini ekler.
            th.style.border = '1px solid grey'; // Stil ekler.
            headerRow.appendChild(th); // th elemanını başlık satırına ekler.
        });
        table.appendChild(headerRow); // Başlık satırını tabloya ekler.

        data.forEach(row => { // Her bir veri satırı için işlemleri yapar.
            let rowElement = document.createElement('tr'); // Yeni bir satır elemanı oluşturur.
            let rowData = [row.id, row.eng_Write, row.tr_Write, row.eng_Read]; // Satır verilerini belirler.
            rowData.forEach(data => {
                let td = document.createElement('td'); // Her bir veri için td elemanı oluşturur.
                td.textContent = data; // Veri metnini ekler.
                td.style.border = '1px solid grey'; // Stil ekler.
                rowElement.appendChild(td); // td elemanını satıra ekler.
            });

            // Sil butonunu ekler.
            let deleteButton = document.createElement('button'); // Silme butonu oluşturur.
            deleteButton.id = "deleteBtn"; // Butona ID ekler.
            deleteButton.textContent = 'Delete'; // Buton metnini ekler.
            deleteButton.onclick = () => deleteData(row.id); // Tıklama olayında deleteData fonksiyonunu çağırır.
            rowElement.appendChild(deleteButton); // Butonu satıra ekler.

            table.appendChild(rowElement); // Satırı tabloya ekler.
        });

        result.appendChild(table); // Tabloyu HTML elemanına ekler.
    })
    .catch(error => console.error('Sorgu hatası:', error)); // Hata durumunda hatayı konsola yazar.
}

// Veriyi silmek için sunucuya DELETE isteği gönderir.
function deleteData(id) {
    fetch(`/delete/${id}`, { // Sunucuya DELETE isteği gönderir.
        method: 'DELETE' // HTTP metodunu belirler.
    })
    .then(response => response.json()) // Yanıtı JSON formatında işler.
    .then(data => {
        alert(data.message); // Sunucudan gelen mesajı kullanıcıya gösterir.
        queryData(); // Verileri güncellemek için queryData fonksiyonunu çağırır.
    })
    .catch(error => console.error('Silme hatası:', error)); // Hata durumunda hatayı konsola yazar.
}

// Rastgele bir veriyi çekerek gösterir.
function randomQuery() {
    fetch('/query/random') // Sunucuya GET isteği gönderir.
    .then(response => response.json()) // Yanıtı JSON formatında işler.
    .then(data => {
        let result = document.getElementById('randomResult'); // Sonuçların gösterileceği HTML elemanını alır.
        result.innerHTML = ''; // Mevcut içeriği temizler.

        if (Object.keys(data).length === 0) { // Eğer veri yoksa mesaj gösterir.
            result.textContent = 'Veri bulunamadı.';
        } else {
            let randomTable = document.createElement('table'); // Bir tablo elemanı oluşturur.
            randomTable.style.border = '1px solid black'; // Tabloya stil ekler.
            randomTable.style.width = '100%';

            let randomHeaderRow = document.createElement('tr'); // Tablo başlık satırını oluşturur.
            let randomHeaders = ['ID', 'ENG_WRITE', 'TR_WRITE', 'ENG_READ']; // Başlık isimlerini belirler.
            randomHeaders.forEach(header => {
                let th = document.createElement('th'); // Her bir başlık için th elemanı oluşturur.
                th.textContent = header; // Başlık metnini ekler.
                th.style.border = '1px solid black'; // Stil ekler.
                randomHeaderRow.appendChild(th); // th elemanını başlık satırına ekler.
            });
            randomTable.appendChild(randomHeaderRow); // Başlık satırını tabloya ekler.

            let randomRow = document.createElement('tr'); // Yeni bir satır elemanı oluşturur.
            let randomRowData = [data.id, data.eng_Write, data.tr_Write, data.eng_Read]; // Satır verilerini belirler.
            randomRowData.forEach(data => {
                let td = document.createElement('td'); // Her bir veri için td elemanı oluşturur.
                td.textContent = data; // Veri metnini ekler.
                td.style.border = '1px solid black'; // Stil ekler.
                randomRow.appendChild(td); // td elemanını satıra ekler.
            });
            randomTable.appendChild(randomRow); // Satırı tabloya ekler.

            result.appendChild(randomTable); // Tabloyu HTML elemanına ekler.
        }
    })
    .catch(error => console.error('Rastgele sorgu hatası:', error)); // Hata durumunda hatayı konsola yazar.
}
