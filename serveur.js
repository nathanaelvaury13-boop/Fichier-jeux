// serveur.js
const net = require('net');
const { exec } = require('child_process');

const PORT = 3000;

const serveur = net.createServer((socket) => {
    console.log(`[CONNEXION] Client connecté : ${socket.remoteAddress}`);

    socket.on('data', (data) => {
        const commande = data.toString().trim();
        console.log(`[REÇU] Commande reçue : ${commande}`);

        if (commande === 'whoami' || commande === 'uptime') {
            exec(commande, (erreur, stdout) => {
                if (erreur) {
                    socket.write(`Erreur : ${erreur.message}`);
                } else {
                    socket.write(stdout);
                }
            });
        } else {
            socket.write("Commande refusée.\n");
        }
    });

    socket.on('end', () => {
        console.log("[DÉCONNEXION] Le client s'est déconnecté.");
    });
});

// Écoute sur toutes les interfaces réseau (Wi-Fi, Ethernet) sur le port 3000
serveur.listen(PORT, '0.0.0.0', () => {
    console.log(`[DÉMARRAGE] Serveur d'écoute actif sur le port ${PORT}`);
});