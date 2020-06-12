const { OAuth2Client } = require('google-auth-library');
const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');

const keys = require ('./keys/keys.json');
const { resolve } = require('path');

async function main() {
    const oAuth2Client = await getAuthenticatedClient();

    const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
    const res = await oAuth2Client.request({url});
    console.log(res.data);

    const tokenInfo = await oAuth2Client.getTokenInfo(
        oAuth2Client.credentials.access_token
    );
    console.log(tokenInfo);
}

function getAuthenticatedClient() {
    return new Promise((res, rej) => {
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile'
        });

        const server = http.createServer(async (req, res) => {
            try {
                if (req.url.indexOf('/oauth2callback') > -1) {
                    const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
                    const code = qs.get('code');
                    console.log(`Code is ${code}`);
                    res.end(`Authentication Successful!`)
                    server.destroy();

                    const r = await oAuth2Client.getToken(code);
                    oAuth2Client.setCredentials(r.tokens);
                    console.info('Tokens Acquired!');
                    resolve(oAuth2Client)
                }
            } catch (err) {
                rej(err)
            }
        })
        .listen(3000, () => {
            opn(authorizeUrl, {wait: false})
                .then(cp => cp.unref());
        });
        destroyer(server);
    });
}

main().catch(console.error);