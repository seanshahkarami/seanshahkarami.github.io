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

<nav class="menu">
<a class="menu-item" href="index.html">Home</a>
<a class="menu-item" href="projects.html">Projects</a>
<a class="menu-item" href="teaching.html">Teaching</a>
<a class="menu-item" href="resume-sean-shahkarami.pdf">Resume</a>
<a class="menu-item" href="https://github.com/seanshahkarami">GitHub</a>
<a class="menu-item" href="mailto:sean.shahkarami@gmail.com">Email</a>
</nav>

<main class="content">
${content}
</main>

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
