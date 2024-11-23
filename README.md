**E-Commerce App Smart System Server IoT**

**A) Tampilan Server**

![image](https://github.com/user-attachments/assets/28c5516b-4292-439c-a717-5951254116c9)

**B) Tampilan Client**

![image](https://github.com/user-attachments/assets/d4566751-5248-494a-b2cf-c2583a14b391)


**Cara menjalankannya:**
1. Download/Clone Reposytory e-commerce-microdot-web-server
2. Salin dan Ekstrak Projek pada direktory folder yang telah disiapkan
3. Buka Project server-flask dengan IDE PyCharm

**    A. Server-Flask**
   
        a) Buat Virtual Enviorement
   
        b) Instaal library yang diminta
   
        c) Update/ubah IP Address pada file app.py baris paling bawah sesuai IP Komputer yang dipakai
   
        d) Jalankan projeknya (Running) 

**    B) Client-Microdot-Rasbery-Pico-W**
   
        a) Buka IDE Thonny Python
   
        b) Pastikan Rasbery Pico-W sudah Terinstall Micropython
   
        c) Jika belum, silahkan Install Rasbery Pico-W Sensor BMP280
   
        d) Copy semua file pada folder project Client-Microdot-Rasbery-Pico-W yg didownload tadi ke dalam Rasbery Pico W
   
        d) Buka file chart_products_month.js dan filter_products_stock.js. Ubah api = "http://192.168.227.239:80" sesuai dengan IP komputer yang digunakan. Save semua filenya.
   
        e) Buka file main.py. Ubah IP_SERVER = "http://192.168.227.239:80" sesuai dengan IP komputer yang digunakan. Save semua filenya.
   
        f) Jalankan projeknya  (Running) 


Created by Kelompok 2 Kelas Pemrograman Web Framework Angkatan 20 - Balai Besar Pengembangan Penjaminan Mutu Pendidikan Vokasi Bidang Otomotif dan Elektronika (BBPPMPV BOE) 
