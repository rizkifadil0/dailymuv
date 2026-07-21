# Menggunakan image resmi Node.js versi lts
FROM node:20-alpine 

# Tentukan direktori kerja didlam container
WORKDIR /

# Mengcopy File .json
COPY package*.json ./

# Install Depedencies didalam container
RUN npm install

# salin seluruh sisa file project ke dalam container 
COPY . .

EXPOSE 3000

#perintah untuk menjalankan aplikasi saat container menyala
CMD ["npm", "start"]
