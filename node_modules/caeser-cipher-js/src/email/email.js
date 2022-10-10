import nodemailer from 'nodemailer';
import pkg from "googleapis";
const { google } = pkg;
const OAuth2 = google.auth.OAuth2;
import dotenv from 'dotenv';
dotenv.config();

const Mailer = {
    getCredentialsTransport(service, user, password) { // Create Transport Object
        return nodemailer.createTransport({
            service: service,
            auth: {
                user: user,
                pass: password
            }
        });
    },

    async createTransporterObj() {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
        
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                reject("Failed to create access token :(\n Check your ENV Variables");
                }
                resolve(token);
            }); 
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.GMAIL,
                accessToken: accessToken,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        return transporter;
    },
    
    getMsgOptions(sender, recipient, type, data, constraint) { // Set Up Message Options
        let subject = "CCJS-";
        let bodyText = "";

        if (type === 'encrypt') {
            subject += "ENC";
            bodyText = "<---- Encrypted Text ---->\n";
        }
        if (type === 'decrypt') {
            subject += "DEC";
            bodyText = "<---- Decrypted Text ---->\n";
        }

        bodyText = this.configureBodyText(bodyText, data, constraint);
        bodyText += "\n\nSent From: " + sender;

        return {
            subject: subject,
            text: bodyText,
            to: recipient,
            from: sender
        };
    },
    configureBodyText(bodyText, data, constraint) {
        if (!constraint || constraint === 'ALL') {
            if (data.msg){ bodyText += "\nMessage: " + data.msg; }
            if (data.shift){ bodyText += "\nShift: " + data.shift; }
            if (data.shifts){ bodyText += "\nShifts: " + data.shifts; }
            if (data.indexes){ bodyText += "\nNumber Indexes: " + data.indexes; }
            if (data.numIndexes){ bodyText += "\nNumber Indexes: " + data.numIndexes; }
        } 
        if (constraint === 'MESSAGE') {
            if (data.shifts){ bodyText += "\nMessage: " + data.msg; }
        }
        if (constraint === 'KEYS') {
            if (data.shift){ bodyText += "\nShift: " + data.shift; }
            if (data.shifts){ bodyText += "\nShifts: " + data.shifts; }
            if (data.indexes){ bodyText += "\nNumber Indexes: " + data.indexes; }
            if (data.numIndexes){ bodyText += "\nNumber Indexes: " + data.numIndexes; }
        }
        return bodyText;
    },

    // SEND ENCRYPTIONS
    sendEncryptionMessage(sender, recipient, data) {
        const msgOptions = this.getMsgOptions(sender, recipient, 'encrypt', data, 'MESSAGE');
        return this.sendMailAttempt(msgOptions);
    },
    sendEncryptionKeys(sender, recipient, data) {
        const msgOptions = this.getMsgOptions(sender, recipient, 'encrypt', data, 'KEYS');
        return this.sendMailAttempt(msgOptions);
    },
    sendEncryptionAll(sender, recipient, data) {
        const msgOptions = this.getMsgOptions(sender, recipient, 'encrypt', data);
        return this.sendMailAttempt(msgOptions);
    },

    // SEND DECRYPTIONS
    sendDecryptionMessage(sender, recipient, data) {
        const msgOptions = this.getMsgOptions(sender, recipient, 'decrypt', data, 'MESSAGE');
        return this.sendMailAttempt(msgOptions);
    },
    sendDecryptionKeys(sender, recipient, data) {
        const msgOptions = this.getMsgOptions(sender, recipient, 'decrypt', data, 'KEYS');
        return this.sendMailAttempt(msgOptions);
    },
    sendDecryptionAll(sender, recipient, data) {
        const msgOptions = this.getMsgOptions(sender, recipient, 'decrypt', data);
        return this.sendMailAttempt(msgOptions);
    },

    // sendMailAttempt(msgOptions) {
    //     const TP = this.getTransport();
    //     return TP.sendMail(msgOptions) ? "Message Sent Successfully" : "Message Sending Failed";
    // }
    async sendMailAttempt(msgOptions) {
        try {      
            const TP = await this.createTransporterObj();
            return await TP.sendMail(msgOptions) ? "Message Sent Successfully" : "Message Sending Failed";
        } catch (error) {
            console.error(error);
        }
    }
}

export default Mailer;