.PHONY: default
default:
	echo "No target specified."


.PHONY: host
host:
	python3 -m http.server 8006 --bind 127.0.0.1
