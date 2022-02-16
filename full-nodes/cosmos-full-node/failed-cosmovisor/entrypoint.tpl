#!/bin/bash
blkid --match-token TYPE=xfs ${nvme_device_name} || mkfs --type xfs -f ${nvme_device_name}
mkdir /home/${vm_user}/.ethereum
mount ${nvme_device_name} /home/${vm_user}/.ethereum
chown ${vm_user}:${vm_user} /home/${vm_user}/.ethereum

# new for cosmos
apt-get update
apt-get install git make gcc curl -y

# install go
curl -OL https://golang.org/dl/go1.17.4.linux-amd64.tar.gz
sudo tar -C /usr/local -xvf go1.17.4.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$(go env GOPATH)/bin

# install gaia
git clone -b v6.0.0 https://github.com/cosmos/gaia
cd gaia
make install

gaiad init moniker-name

# Prepare genesis file for cosmoshub-4
wget https://github.com/cosmos/mainnet/raw/master/genesis.cosmoshub-4.json.gz
gzip -d genesis.cosmoshub-4.json.gz
mv genesis.cosmoshub-4.json $HOME/.gaia/config/genesis.json

# Set minimum gas price & peers
cd $HOME/.gaia/config/
sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "0.0025uatom"/' app.toml
sed -i 's/persistent_peers = ""/persistent_peers = "6e08b23315a9f0e1b23c7ed847934f7d6f848c8b@165.232.156.86:26656,ee27245d88c632a556cf72cc7f3587380c09b469@45.79.249.253:26656,538ebe0086f0f5e9ca922dae0462cc87e22f0a50@34.122.34.67:26656,d3209b9f88eec64f10555a11ecbf797bb0fa29f4@34.125.169.233:26656,bdc2c3d410ca7731411b7e46a252012323fbbf37@34.83.209.166:26656,585794737e6b318957088e645e17c0669f3b11fc@54.160.123.34:26656,5b4ed476e01c49b23851258d867cc0cfc0c10e58@206.189.4.227:26656"/' config.toml

# Start Gaia
gaiad start --x-crisis-skip-assert-invariants

echo "${nvme_device_name} ~/.ethereum xfs defaults,nofail 0 2" >> /etc/fstab
echo "${geth_service}" > /etc/systemd/system/geth.service
systemctl daemon-reload
systemctl enable geth.service
systemctl start geth.service
