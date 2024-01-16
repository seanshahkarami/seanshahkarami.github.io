build:
	npm run build

publish: build
	git add docs
	git commit docs -m "update"
	git push
