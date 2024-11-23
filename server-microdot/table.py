from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Fungsi untuk koneksi ke database
def get_db_connection():
    conn = sqlite3.connect('db_products.db')
    conn.row_factory = sqlite3.Row
    return conn

# Buat tabel produk jika belum ada
def create_table():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            stock INTEGER DEFAULT 0,
            category TEXT NOT NULL,
            image_url TEXT,
            sku TEXT UNIQUE,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Buat tabel produk jika belum ada
def create_table_admin():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Buat tabel produk jika belum ada
def create_table_category():
    conn = get_db_connection()
    conn.execute('''
         CREATE TABLE IF NOT EXISTS category (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Buat tabel transaktiom jika belum ada
def create_table_transaction():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS transaction_product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL CHECK (quantity > 0),
            total_price REAL NOT NULL CHECK (total_price >= 0),
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    ''')
    conn.commit()
    conn.close()


# Jalankan aplikasi Flask
if __name__ == '__main__':
    create_table()  # Membuat tabel saat aplikasi dijalankan pertama kali
    create_table_admin()
    create_table_category()
    create_table_transaction()
    app.run(debug=True)
