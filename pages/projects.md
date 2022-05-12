# Projects

These are things I've created that I think are cool.

### [Docker Data Pull Estimator](https://github.com/seanshahkarami/docker-image-pull-size)

This is a tool I wrote to (approximately) answer the question "How much data will be downloaded when
pulling a series of Docker images?"

The interesting bit of this is keeping track of the shared layers between images and giving
a useful summary to the user at each step.

This was motivated at my job with the [Sage](https://sagecontinuum.org) project. Our team and users
build on top of a core set of Docker base images. Some of are quite large (~5GB), so we try to preload them on our
edge devices to reduce network bandwidth. This tool allowed me to quickly simulate the data cost of a series of
pulls with various preload strategies.

### [Probe Memory Model](https://github.com/seanshahkarami/probe-memory-model)

A tool which implements a few of the memory model probes discussed in [Russ Cox's fantastic "Hardware Memory Models" blog post](https://research.swtch.com/hwmm).

### [Mooseheart](mooseheart.html)

A cute "screensaver" which generates a random night sky each time you click on it.

### [Tracy](tracy.html)

A basic ray tracer which displays some nice looking metallic spheres.

### [Noice](https://github.com/seanshahkarami/seanshahkarami.github.io/blob/main/docs/noice.py)

[Streamlit](https://www.streamlit.io) example of generating cool images from random noise. To run
it, you'll need make sure you have the required packages, then you can use "streamlit run" directly from the
web.

```sh
pip3 install numpy scipy matplotlib streamlit

streamlit run https://raw.githubusercontent.com/seanshahkarami/seanshahkarami.github.io/main/docs/noice.py
```
