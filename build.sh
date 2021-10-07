#!/bin/sh -e

render() {
    content=$(cat "$1")
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
<div class="nav">
<span><a href="index.html">Home</a></span>
<span><a href="teaching.html">Teaching</a></span>
<span><a href="random.html">Random</a></span>
<span><a href="resume-sean-shahkarami.pdf">Resume</a></span>
<span><a href="https://github.com/seanshahkarami">GitHub</a></span>
<span><a href="mailto:sean.shahkarami@gmail.com">Email</a></span>
</div>
${content}
</div>
</body>
</html>
EOF
}

# make working directory same as this script
cd $(dirname $0)

for f in pages/*.html; do
    fout=docs/$(basename "$f")
    echo "render $f to $fout"
    render "$f" > "$fout"
done
