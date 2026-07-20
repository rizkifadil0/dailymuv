# DailyLife Web Application

## Software Requirements Specification (SRS)

Version: 1.0

---

# 1. Project Overview

## Description

DailyLife adalah aplikasi web yang membantu pengguna mengatur aktivitas sehari-hari dalam satu tempat.

Aplikasi menyediakan fitur:

- Authentication (Login & Register)
- Dashboard
- To Do List
- Daily Journal
- Weather Information

Target pengguna adalah mahasiswa, pekerja, maupun masyarakat umum yang ingin mengatur aktivitas sehari-hari.

---

# 2. Objectives

Website ini bertujuan untuk:

- Membantu pengguna mengelola tugas.
- Membantu mencatat aktivitas harian.
- Memberikan informasi cuaca secara real-time.
- Menjadi aplikasi produktivitas sederhana namun lengkap.

---

# 3. User Roles

## User

Setiap pengguna memiliki akun masing-masing.

User dapat:

- Register
- Login
- Logout
- Mengelola tugas
- Menulis jurnal
- Melihat cuaca

---

# 4. Application Flow

```
Landing Page
      │
      ▼
 Login / Register
      │
      ▼
 Dashboard
 ├── Weather
 ├── Journal
 └── To Do List
```

---

# 5. Features

# 5.1 Authentication

## Register

User harus dapat membuat akun baru.

Field:

- Full Name
- Email
- Password
- Confirm Password

Validasi:

- Semua field wajib diisi
- Email harus unik
- Password minimal 8 karakter
- Confirm password harus sama

---

## Login

User login menggunakan:

- Email
- Password

Jika berhasil:

→ Redirect ke Dashboard

Jika gagal:

→ Menampilkan pesan error.

---

## Logout

User dapat keluar dari akun.

Session akan dihapus.

---

# 5.2 Dashboard

Setelah login, user akan masuk ke Dashboard.

Dashboard berisi:

- Ucapan selamat datang
- Ringkasan jumlah tugas
- Ringkasan jurnal
- Informasi cuaca hari ini
- Shortcut menuju semua fitur

Contoh:

```
Hello, Rizki 👋

Today's Weather
28°C Sunny

Task Summary

To Do : 5
Done : 12
Failed : 1
Progress : 3

Journal
Last Journal:
"Belajar Express.js"

Quick Menu

[ To Do ]
[ Journal ]
[ Weather ]
```

---

# 5.3 Navigation Bar

Navbar terdiri dari:

- Dashboard
- Weather
- Journal
- To Do List
- Profile
- Logout

---

# 5.4 To Do List

Menu ini digunakan untuk mencatat tugas.

## Data

Setiap tugas memiliki:

- Task Name
- Description
- Start Date
- End Date
- Status

Status terdiri dari:

- To Do
- In Progress
- Done
- Failed

---

## CRUD

User dapat:

- Create Task
- Read Task
- Update Task
- Delete Task

---

## Create Task

Field:

- Task Name
- Description
- Start Date
- End Date
- Status

Default Status:

```
To Do
```

---

## Update Task

User dapat mengubah:

- Nama
- Deskripsi
- Status
- Start Date
- End Date

---

## Delete Task

User dapat menghapus tugas.

Sebelum menghapus muncul dialog:

```
Are you sure?
```

---

## Filter

Task dapat difilter berdasarkan:

- Semua
- To Do
- In Progress
- Done
- Failed

---

## Search

Pencarian berdasarkan:

- Nama tugas

---

## Sorting

Sort berdasarkan:

- Deadline Terdekat
- Deadline Terlama
- Nama
- Status

---

# 5.5 Daily Journal

Menu ini digunakan sebagai jurnal harian.

---

## Data

Setiap jurnal memiliki:

- Title
- Created Date
- Content

Tanggal dibuat otomatis ketika jurnal dibuat.

Tidak dapat diubah.

---

## CRUD

User dapat:

- Create Journal
- Read Journal
- Update Journal
- Delete Journal

---

## Create Journal

Field:

- Title
- Content

Created Date otomatis.

---

## Journal List

Menampilkan:

- Title
- Date
- Preview isi jurnal

---

## Detail Journal

Menampilkan seluruh isi jurnal.

---

## Search Journal

Pencarian berdasarkan:

- Judul

---

## Sort Journal

Urutkan berdasarkan:

- Terbaru
- Terlama

---

# 5.6 Weather

Menu Weather menampilkan informasi cuaca berdasarkan lokasi pengguna.

Data yang ditampilkan:

- Kota
- Suhu
- Kondisi Cuaca
- Humidity
- Wind Speed
- Rain Probability
- Sunrise
- Sunset
- UV Index
- Feels Like Temperature

---

## Weather Forecast

Menampilkan prediksi cuaca:

- Hari ini
- Besok
- 7 Hari ke depan

---

## Location

Lokasi dapat diperoleh dari:

- Browser Geolocation API

atau

- Input nama kota

---

# 6. API Recommendation

## Open-Meteo API (Recommended)

Gratis.

Tidak perlu API Key.

Website:

https://open-meteo.com/

Kelebihan:

- Gratis
- Tidak ada limit yang ketat
- Tidak perlu registrasi
- Sangat cepat
- Mendukung forecast
- Mendukung geocoding

API yang digunakan:

### Geocoding

```
https://geocoding-api.open-meteo.com/v1/search
```

Untuk mencari koordinat kota.

---

### Forecast

```
https://api.open-meteo.com/v1/forecast
```

Data:

- Temperature
- Weather Code
- Wind Speed
- Humidity
- Rain
- UV Index
- Sunrise
- Sunset

---

# 7. Database Design

## Users

| Field     | Type     |
| --------- | -------- |
| id        | ObjectId |
| fullname  | String   |
| email     | String   |
| password  | String   |
| createdAt | Date     |

---

## Tasks

| Field       | Type     |
| ----------- | -------- |
| id          | ObjectId |
| userId      | ObjectId |
| title       | String   |
| description | String   |
| startDate   | Date     |
| endDate     | Date     |
| status      | String   |
| createdAt   | Date     |

---

## Journals

| Field     | Type     |
| --------- | -------- |
| id        | ObjectId |
| userId    | ObjectId |
| title     | String   |
| content   | Text     |
| createdAt | Date     |

---

# 8. Functional Requirements

## Authentication

- Register
- Login
- Logout
- Password Hashing

---

## Dashboard

- Menampilkan ringkasan task
- Menampilkan cuaca
- Menampilkan jurnal terbaru

---

## To Do

- Tambah tugas
- Edit tugas
- Hapus tugas
- Filter
- Search
- Sort

---

## Journal

- Tambah jurnal
- Edit jurnal
- Hapus jurnal
- Search
- Sort

---

## Weather

- Cuaca realtime
- Forecast 7 hari
- Berdasarkan lokasi user

---

# 9. Non Functional Requirements

## Performance

- Response < 2 detik

---

## Security

- Password menggunakan bcrypt
- Session menggunakan JWT atau Express Session
- Validasi input
- Sanitasi data

---

## Responsive

Website harus berjalan dengan baik pada:

- Desktop
- Tablet
- Mobile

---

# 10. Technology Stack

## Frontend

- HTML
- Tailwind CSS
- EJS
- JavaScript

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB
- Mongoose

---

## Authentication

- bcrypt
- express-session atau JWT

---

## Weather API

- Open-Meteo API

---

# 11. Future Features (Optional)

Beberapa fitur yang dapat ditambahkan di masa depan:

- Reminder Notification
- Calendar View
- Dark Mode
- Profile Photo
- Monthly Statistics
- Habit Tracker
- Pomodoro Timer
- Export Journal ke PDF
- Export Task ke Excel
- Mood Tracker
- Achievement System
- Email Reminder
