#!/bin/bash

echo "Se tudo correr bem os json-servers fecham ao mesmo tempo com Ctrl+C"

# tive preguica de juntar tudo no mesmo json e o json server ao contrario do que diz nos docs nao consegue usar varios ficheiros
# corri varios num port diferente
# com & ou & disown, fechar terminal nao fecha processos e isso e muito chato
# logo o chatgpt teve de fazer um cook

# Define a function to clean up and terminate background processes
cleanup() {
    echo "Closing the terminal. Terminating background processes..."
    # Send SIGTERM to the process group
    kill -- -$$
    exit
}

# Trap the EXIT signal (when the script exits) and SIGINT (Ctrl+C) to call the cleanup function
trap cleanup EXIT
trap cleanup SIGINT

# Run your commands in the background with nohup
nohup json-server -p 3000 ficheiros/filmes_with_ids.json &> /dev/null &
echo "Init 3000"
nohup json-server -p 3001 ficheiros/generos.json &> /dev/null &
echo "Init 3001"
nohup json-server -p 3002 ficheiros/atores.json &> /dev/null &
echo "Init 3002"

# Keep the script running to allow traps to function
while true; do
    sleep 1
done
