@echo off
title Script d'automatisation - Bac Pro CIEL
echo ==========================================
echo Lancement des scripts d'administration...
echo ==========================================

:: 1. Lance le serveur dans une nouvelle fenêtre
start cmd /k "node serveur.js"

:: Pause de 2 secondes pour laisser le temps au serveur de s'initialiser
timeout /t 2 /nobreak > nul

:: 2. Lance le client qui va exécuter la commande et notifier Telegram
start cmd /k "node client.js"

echo.
echo [INFO] Les deux terminaux ont été initialisés.
pause