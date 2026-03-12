IMAGE=tgkaiser/financ-angular
VERSION=1.4.1

build:
	docker buildx build --platform linux/amd64 -t $(IMAGE):$(VERSION) .

push:
	docker push $(IMAGE):$(VERSION)

deploy: build push
