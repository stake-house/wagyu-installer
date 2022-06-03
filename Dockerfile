# credit https://trigodev.com/blog/develop-electron-in-docker
FROM node:16.15.0


RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install \
    build-essential clang  policykit-1 \
    git libx11-xcb1 libxcb-dri3-0 libcups2-dev libxtst-dev libatk-bridge2.0-0 libdbus-1-dev libgtk-3-dev libxss1 libnotify-dev libasound2-dev libcap-dev libdrm2 libice6 libsm6 \
    xorg openbox libatk-adaptor \
    gperf bison python3-dbusmock \
    libnss3-dev gcc-multilib g++-multilib curl sudo \
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
# RUN mkdir -p /etc/apt/keyrings
# RUN  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# RUN echo \
#     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
#     $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

RUN curl -fsSL https://get.docker.com | sh
RUN curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose
# RUN sudo groupadd docker

WORKDIR /app
COPY . .
RUN chown -R node /app

# install node modules and perform an electron rebuild
USER node
RUN npm install
RUN npx electron-rebuild

USER root
RUN chown root /app/node_modules/electron/dist/chrome-sandbox
RUN chmod 4755 /app/node_modules/electron/dist/chrome-sandbox
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
RUN usermod -aG sudo node
RUN usermod -aG docker node


USER node
ENTRYPOINT [ "bash" ]
# docker run --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=unix$DISPLAY -v `pwd`/src:/app/src --rm -it electron-wrapper bash