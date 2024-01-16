build:
	npm run build

publish: build
	git add docs
	git commit . -m "update"
	git push
