#!/bin/bash
sudo \cp -rf /home/ubuntu/temp /home/ubuntu/HC-backend
sudo cp /home/ubuntu/.env /home/ubuntu/HC-backend/
cd /home/ubuntu/HC-backend 
sudo npm install
pm2 start /home/ubuntu/HC-backend/app.js

if [ -d /home/ubuntu/temp ]; then
    sudo rm -rf /home/ubuntu/temp
fi
