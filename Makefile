.PHONY: build
build:
	npm run build

.PHONY: publish
publish: build
	git add dist
	git commit dist -m "update"
	git push
