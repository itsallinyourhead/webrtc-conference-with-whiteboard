# webrtc-conference-with-whiteboard
Share whiteboard, camera video, screen and recorded videos and audios with other peers.
<p align="center">
  <img alt="Preview" height="354" src="/preview.png" width="640"/>
</p>

<h2>Installation</h2>

<b>1. Upload files to your server</b>

<b>2. Configure webserver</b><br>
Deliver turn credentials and redirect websocket connections to nodejs<br>
Example in backend/nginx.conf

<b>3. Configure nodejs</b>
<pre>cd backend
npm install lru-cache
npm install pm2
npm install ws</pre>

<b>4. Configure turn server (optional)</b><br>
If a direct connection between peers is not possible, traffic can be routed through your server.<br>
Replace YOURDOMAIN, YOURAUTHSECRET, YOURIPv4 and YOURIPv6 with your own values in the files conference-config.js and turnserver-webrt.conf.
<pre>sudo apt update
sudo apt install coturn

cp turnserver-webrtc.conf /etc
cp /lib/systemd/system/coturn.service /etc/systemd/system/coturn@.service

nano /etc/systemd/system/coturn@.service
  add this line: ExecStart=/usr/bin/turnserver -c /etc/turnserver-%i.conf

sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable --now coturn@webrtc</pre>

<b>5. Start signaling server</b>
<pre>cd backend
pm2 start conference.js</pre>


<h2>Libraries</h2>
<pre>html2canvas 1.4.1 https://html2canvas.hertzen.com
pdf.js https://mozilla.github.io/pdf.js/
qrCodeGenerator https://github.com/kazuhikoarase/qrcode-generator
</pre>

<h2>Licence</h2>
<pre>Licensed under the **Apache License 2.0** — with the explicit understanding that **commercial use** (selling products/services that incorporate or derive substantial value from this code) requires prior written permission from the author.

For non-commercial use (personal projects, education, research, open-source contributions), feel free to use, modify, and distribute under the terms of this license.</pre>