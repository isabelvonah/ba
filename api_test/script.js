const csvData = 'Name,Age,Email\nJohn Doe,30,johndoe@example.com\nJane Smith,25,janesmith@example.com';

const csvBlob = new Blob([csvData], { type: 'text/csv' });

const formData = new FormData();
formData.append('csvFile', csvBlob, 'data.csv');

fetch('http://localhost:3000/upload', {
  method: 'POST',
  body: formData
})
  .then(response => response.text())
  .then(result => {
    console.log(result); // File uploaded successfully
  })
  .catch(error => {
    console.error('Error:', error);
  });