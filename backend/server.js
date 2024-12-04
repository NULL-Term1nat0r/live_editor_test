const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Define the path for the JSON file where the document content will be stored
const documentFilePath = path.join(__dirname, 'document.json');

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests for development

// Function to read the document content from the file
const readDocumentContent = () => {
  try {
    // Check if the file exists
    if (!fs.existsSync(documentFilePath)) {
      console.log('document.json file not found. Creating a new one.');
      // Create an empty document.json file if it doesn't exist
      writeDocumentContent('');
    }

    const data = fs.readFileSync(documentFilePath, 'utf8');
    console.log('Document content read from file:', data);
    return JSON.parse(data).content || ''; // Return empty string if content is missing
  } catch (error) {
    console.error('Error reading file:', error);
    return ''; // Return empty string if there's an error reading the file
  }
};

// Function to write the document content to the file
const writeDocumentContent = (content) => {
  try {
    // Stringify the content properly
    const data = JSON.stringify({ content: content }, null, 2);
    fs.writeFileSync(documentFilePath, data, 'utf8');
    console.log('Document saved to file:', data); // Logging the actual file content being saved
  } catch (error) {
    console.error('Error saving file:', error);
  }
};

// API endpoint to fetch the document content
app.get('/document', (req, res) => {
  console.log('GET request to /document');
  const content = readDocumentContent();
  res.json({ content });
});

// API endpoint to save the document content
app.post('/document', (req, res) => {
  console.log('POST request to /document');
  console.log('Request body:', req.body);

  if (req.body.content === undefined) {
    return res.status(400).json({ error: 'Content is required' });
  }

  writeDocumentContent(req.body.content); // Save content to the file
  res.status(200).send('Content saved successfully');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
