# Cannonistic
A simple game

On Win10 I run it atm lie this:

docker build . -t cannonistic && winpty docker run --rm -it --init -v /${PWD}:/usr/src/app/data -p 80:80 cannonistic
