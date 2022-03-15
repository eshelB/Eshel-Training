#! /usr/bin/bash
date=$(date)

# update expensive eth node stats
#data1=$(curl -s "20.71.37.140:8545" -X POST -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"eth_syncing","params": [],"id":1}')
#echo got data for node eth expensive: $data1


#[[ $data1 =~ currentBlock\":\"(.*?)\",\"healedBytecodeBytes ]]
#height1=${BASH_REMATCH[1]}
#echo -e "height eth expensive is $height1\n"

#printf "%s: the block height was %s\n" "$date" "$height1" >> ~/Training/full-nodes/eth-full-node-expensive/stats.txt
#echo saved stats to file


# update cheaper eth node stats
data2=$(curl -s "20.71.225.176:8545" -X POST -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"eth_syncing","params": [],"id":1}')
echo got data for node eth cheap: $data2


[[ $data2 =~ currentBlock\":\"(.*?)\",\"healedBytecodeBytes ]]
height2=${BASH_REMATCH[1]}
echo -e "height eth cheap is $height2\n"

printf "%s: the block height was %s\n" "$date" "$height2" >> ~/Training/full-nodes/eth-full-node-cheaper/stats.txt
echo saved stats to file

# update cosmos node stats
data3=$(curl -s "52.234.1.90:26657/block" | grep height | tail -n 1)
echo got data for cosmos node: $data3

[[ $data3 =~ height\":\ \"(.*?)\", ]]
height3=${BASH_REMATCH[1]}
echo -e "height cosmos is $height3\n"

printf "%s: the block height was %s\n" "$date" "$height3" >> ~/Training/full-nodes/cosmos-full-node/stats.txt
echo saved stats to file


# update secret node stats
data4=$(curl -s "51.142.106.235:26657/block" | grep height | tail -n 1)
echo got data for secret node: $data4

[[ $data4 =~ height\":\ \"(.*?)\", ]]
height4=${BASH_REMATCH[1]}
echo height secret is $height4

totaldata=$(curl -s "http://peer.node.scrtlabs.com:26657/block" | grep height | tail -n 1)
echo got total data for secret node: $totaldata
[[ $totaldata =~ height\":\ \"(.*?)\", ]]
total=${BASH_REMATCH[1]}
echo "total: $total"

percent=$(bc <<< "scale=3; $height4/$total*100")
echo "percent: $percent"
printf "%s - height: %s, total: %s, percentage: %s\n" "$date" "$height4" "$total" "$percent" >> ~/Training/full-nodes/secret-full-node/stats.txt
echo saved stats to file
