IMAGE=tgkaiser/financ-angular
VERSION=1.6.2

build:
	docker buildx build --platform linux/amd64 -t $(IMAGE):$(VERSION) .

push:
	docker push $(IMAGE):$(VERSION)

deploy: build push
