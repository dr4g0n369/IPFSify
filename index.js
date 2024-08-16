import { create as ipfsHttpClient } from 'ipfs-http-client';
import express from 'express';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy'; // Use busboy for file uploads
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ipfs = ipfsHttpClient({host: 'localhost', port: '5001', protocol: 'http'});
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(busboy()); 

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/upload', (req, res) => {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        // Debugging to ensure filename is a string
        console.log("Uploading file:", filename.filename);
        if (typeof filename.filename !== 'string') {
            // console.error("Filename is not a string:", filename);
            return res.status(400).send("Invalid filename");
        }

        const filePath = path.join(__dirname, 'files', filename.filename);
        console.log("FilePath: ",filePath)
        const fstream = fs.createWriteStream(filePath);

        file.pipe(fstream);
        fstream.on('close', async function () {
            try {
                const fileHash = await addFile(filename, filePath);
                await fs.promises.unlink(filePath); 
                console.log("Here", filePath);
                res.render('upload', { filename, fileHash });    
            }catch (error) {
                console.error("Error uploading file:", error);
                res.status(500).send("Error uploading file");
            }
        });
    });
});

const addFile = async (fileName, filePath) => {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({path: fileName, content: file});
    const fileHash = fileAdded.cid.toString();  // Adjusted to return CID as string
    return fileHash;
};

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
