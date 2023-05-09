import { google } from 'googleapis';
import fs from 'fs';
import 'dotenv/config';

const credentials = JSON.parse(process.env.CREDENTIALS);

const auth = new google.auth.GoogleAuth({
    // keyFile: `${process.cwd()}/service-account-key-file.json`,
    credentials,
    scopes: 'https://www.googleapis.com/auth/drive',
});

const driveService = google.drive({
    version: 'v3',
    auth,
});

const setFilePublic = async (fileId) => {
    try {
        await driveService.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });
        // const url = await driveService.files.get({
        //     fileId,
        //     fields: 'webViewLink, webContentLink',
        // });
        // return url;
    } catch (error) {
        console.error(error);
    }
};

export const uploadToDrive = async (file) => {
    const fileMetadata = {
        name: file.filename,
        parents: ['1StAksxGN9-NAexLNeZP5Nw7yty9zG3KY'], // Change it according to your desired parent folder id
    };

    const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
    };

    const response = await driveService.files.create({
        requestBody: fileMetadata,
        media: media,
    });
    fs.unlink(file.path, (err) => {
        if (err) throw err;
        console.log('File deleted!');
    });
    await setFilePublic(response.data.id);
    return response.data;
};

export const deleteOnDrive = async (fileId) => {
    try {
        const response = await driveService.files.delete({ fileId });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
