#!/bin/bash

```
                       _     ___ __  __ ____  
   ___  __ _ ___ _   _| |   |_ _|  \/  / ___| 
  / _ \/ _` / __| | | | |    | || |\/| \___ \ 
 |  __/ (_| \__ \ |_| | |___ | || |  | |___) |
  \___|\__,_|___/\__, |_____|___|_|  |_|____/ 
                 |___/                        

```

# Start Python HTTP server
python -m http.server 8000 &

# Get the PID of the Python HTTP server process
PID=$!

# Print out the link to localhost on port 8000
echo "Server running at http://localhost:8000"

# Wait for the user to stop the server
read -p "Press any key to stop the server..."

# Stop the Python HTTP server
kill $PID
