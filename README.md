freegoogle
==========

Google mirror that can be used to make Google search etc available in places where it is blocked, eg China. 
For list of live websites using this code check out https://github.com/greatfire/wiki.
Feedback and contributions are very welcome. If you want to contact us privately please use mirrors@greatfire.org. PGP keys available at https://en.greatfire.org/contact.

## Features

* It can use a list of static Google IPs. It will redirect the user to the IP address that works.
* It can work without javascript by using one fixed IP.
* It includes links to Google tools which are not blocked in China, eg Translate and Maps.
* It can load Google results dynamically. This requires a backend which loads Google results and returns them using a JSONP callback function. This solves the problem of keyword resetting of blocked keywords. The backend code is not included in this repo.

## How to use

The *.htm and *.html files contain a number of variables that need to be replaced with actual values for the mirror to work. We are dynamically replacing these variables when the mirror site is created. The variables are:

* {GOOGLE_IP} - One Google IP address which will be used if the user doesn't have javascript enabled, or if the javascript hasn't yet loaded.
* {GOOGLE_IPS} - List of Google IP addresses. The user will be redirected to the first one that works.
* {GOOGLE_MIRROR_SHORT_URL} - URL used when sharing the mirror site on Sina Weibo.
* {JQUERY} - <script> tag for including jquery. Could be for example `<script src="https://lib.sinaapp.com/js/jquery/1.10.2/jquery-1.10.2.min.js"></script>` or `<script src="jquery-1.10.2.min.js"></script>`.
* {PROVIDER_INSTANCE_URLS} - URLs to backend servers that serve Google results using a JSONP callback function (not required).
* {ALT_GOOGLE_MIRRORS} - List of alternative mirrors that the user can be redirected to in order to distribute traffic.
* {GOOGLE_ANALYTICS_SCRIPT} - Code for including Google Analytics (not required).
