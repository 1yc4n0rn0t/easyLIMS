#!/bin/bash

# Start Python HTTP server
python3 -m http.server 8000 &

# Get the PID of the Python HTTP server process
PID=$!

# Print out the ASCII art
echo "                             ___ __  __ ____  "
echo "   __  __ _ ___ _   _| |   |_ _|  \/  / ___| "
echo " / _ \/ _\`/ __| | | | |    | || |\/| \___ \ "
echo "|  __/ (_| \__ \ |_| | |___ | || |  | |___) |"
echo " \___|\__,_|___/\__, |_____|___|_|  |_|____/ "
echo "                 |___/                        "

# Print out the link to localhost on port 8000
echo "Server running at http://localhost:8000"

# Wait for the user to stop the server
read -p "Press any key to stop the server..."
