#!/bin/bash
while true ; do

echo "[wonxen Moderasyon Botu] Beklenmedik bir hata olustu."
sleep 1
echo "[wonxen Moderasyon Botu] Sistem tarafindan tekrardan baslatildi."

node --optimize_for_size --max-old-space-size=8192 wonxen.js
done