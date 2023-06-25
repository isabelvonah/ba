const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('csvFile'), (req, res) => {
  const file = req.file;
  const filename = req.file.originalname;
  console.log(filename)


  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const newFilename = `${filename}_${Date.now()}.csv`;
  const destinationPath = path.join(__dirname, 'uploads', newFilename);

  fs.renameSync(file.path, destinationPath);

  res.status(200).send('File uploaded successfully.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
