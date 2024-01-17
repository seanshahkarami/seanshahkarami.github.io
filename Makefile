build:
	npm run build

publish: build
	git add dist
	git commit dist -m "update"
	git push
