import { create as ipfsHttpClient } from 'ipfs-http-client';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy'; 
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
app.use(cors());
app.get('/', (req, res) => {
    res.render('home');
});

async function readSong(ipfs, cid) {
  let songBuffer = Buffer.from([]);
  for await (const chunk of ipfs.cat(cid)) {
    songBuffer = Buffer.concat([songBuffer, chunk]);
  }
  return songBuffer;
}

app.get('/getSong/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    console.log('Reading song');
    const songBuffer = await readSong(ipfs, cid);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(songBuffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error reading the song');
  }
});

app.post('/uploadSong', (req, res) => {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading file:", filename.filename);
        if (typeof filename.filename !== 'string') {
            return res.status(400).send("Invalid filename");
        }

        const filePath = path.join(__dirname, 'files', filename.filename);
        const fstream = fs.createWriteStream(filePath);

        file.pipe(fstream);
        fstream.on('close', async function () {
            try {
                const fileHash = await addFile(filename, filePath);
                await fs.promises.unlink(filePath); 
                console.log("FileHash:", fileHash);
                let sendHash = {hash: fileHash};
                res.status(200).send(JSON.stringify(sendHash))
                // res.render('upload', { filename, fileHash });    
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
    const fileHash = fileAdded.cid.toString();  
    return fileHash;
};

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
