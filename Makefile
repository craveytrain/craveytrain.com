imageName="craveytrain/craveytrain.com"

build:
	docker build -t $(imageName) .

run: build
	docker run -p 8080:80 $(imageName)

deploy:
	docker push $(imageName)
