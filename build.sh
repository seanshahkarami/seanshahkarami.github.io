#!/bin/sh -e

render() {
    content=$(pandoc "$1")
    cat <<EOF
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Sean Shahkarami's Website</title>
<meta name="description" content="My personal website for things I like.">
<meta name=”robots” content="index, follow">
<!-- This page's style is inspired by https://github.com/roryg/ghostwriter and Tom Christie's page. -->
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<div class="container">
<nav>
<span><a href="index.html">Home</a></span>
<span><a href="projects.html">Projects</a></span>
<span><a href="teaching.html">Teaching</a></span>
<span><a href="resume-sean-shahkarami.pdf">Resume</a></span>
<span><a href="https://github.com/seanshahkarami">GitHub</a></span>
<span><a href="mailto:sean.shahkarami@gmail.com">Email</a></span>
</nav>
<main>
${content}
</main>
</div>
</body>
</html>
EOF
}

# make working directory same as this script
cd $(dirname $0)

# build all /pages into /docs
for f in pages/*.*; do
    # output to docs dir as .html file
    fout=docs/$(basename "$f" | sed 's/\..*$/.html/')
    echo "render $f to $fout"
    render "$f" > "$fout"
done
