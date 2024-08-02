const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0xuaWdrQjd0a0U4UWQ4bEpheGw4TEZzb3ZPdG1NWk54T3d0Z0ZjT0psVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieWZvdkczLzNkMjcyOC9Qc010dGIwekwrSnArSmZvNjR5cC9Rek80WWRnOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLT0w0NENObnU0RjJJUzk2d2FpTFJFSWZFK2hPdTMvbENHbHFlK2NCYVdJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyc2oxb1FoY3pVR1Y4S25iQUF6bHMxWGF1bDIyNm9STHB3Ykhrenpqb25JPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlEK2taSHZtdDllR3dRamM1QndQMHdhQWtlalpSV0RLT09US0c3WlhhR0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNtb29VZVRyZHl5SzdYM08yeE5JN090Z0RubUlXbWRYei9QZXRMSVNyMFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0FhUUJlVEFQczIzQUZTM1Q2UFlnK0d1S1A3M29JaGxhNHNqQmRHMEZHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiclpEenZvWkVJMHhvcVF2ZlJlV2RhbVVWS0NvRlNIb09MSFpaVGlGQ3dFTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZIMTRMV283OGxjY2Zja25WaTljUU1VMnhKa1VobTNIR2N4S0dGdWhSUUg3YStqbHlveksyWDZ5N1NqVlFySFREekVUbThZZElzcDk0ZG1zdWNpeEJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcsImFkdlNlY3JldEtleSI6ImpjdUZZcXdjYndBUDhNc2RMeE4zSnBldXRGdDZNS1dpTnJSajZBMGxSTG89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlBtRFZRdDRRU0RxaFpTNWdYdFo4TlEiLCJwaG9uZUlkIjoiNzBjOTE0ZGUtMzNkNC00MTRhLTg2MDgtNzhjMWZhYWNmYzNkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZsSEl4WWdWeUtFbGZWRVZCMmdxUkN6OFJGdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwcXVqM1QzK3F4UEh1c084L1ZNUnFCTnJlSm89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUlNGNFIyTjgiLCJtZSI6eyJpZCI6IjI2Mzc4NTM5NjAxMDo0M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJESiBERUxCT1kgQU5JRVkgTUlYVEFQRVMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xLVWxzd0VFTFh3c2JVR0dBOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImNKT1U1SHVYVUV5OEU4NFVLMGtNcWtFSzF2cjJnbkM1d1NWWk1SaEZMbUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjB2SkNuR1UvVnV2UFBWWXQ1QnNZdE5mZFJYZGkwQ0RaNmo1WmFUdHVheFZ6bmRjYlh1cTJQNU1Pa2JWV0lOcVlkb0dQcm5rcElIRk5yTlVaNDFRRkNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJGejhDQVlScmFOYW5Rbm5idGsvUEJvUHQ3U0J0OVg0WVlnMXlYcnhhZmtGSWQ3T3hFSDZOMUxnc0RBY0o5c2tEU0FkSmhDZDFzMnV0VXZmUDdqUlpBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NTM5NjAxMDo0M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYQ1RsT1I3bDFCTXZCUE9GQ3RKREtwQkN0YjY5b0p3dWNFbFdURVlSUzVnIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyNTc5MDExLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFFWSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "DJ DELBOY ANIEY",
    NUMERO_OWNER : process.env.OWNER_NUM || "263 78 539 6010",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
