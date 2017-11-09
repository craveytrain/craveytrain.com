build:
	docker build -t craveytrain/craveytrain.com .

deploy:
	docker push craveytrain/craveytrain.com:latest
