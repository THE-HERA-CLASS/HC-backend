pm2_list=$(pm2 list)

if [[ $pm2_list == *"0      "|*"online"* ]]; then
    pm2 delete 0
fi

if pgrep -f node > /dev/null; then
    sudo kill $(pgrep -f node)
fi

sudo rm -rf /home/ubuntu/HC-backend



if [ -d /home/ubuntu/temp ]; then
    sudo rm -rf /home/ubuntu/temp
fi