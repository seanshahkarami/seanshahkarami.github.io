render:
	quarto render
	cp -r static/ docs/static/
	cp static/resume-sean-shahkarami.pdf docs/
