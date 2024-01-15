---
layout: ../layouts/Layout.astro
title: Projects
---

These are things I've created that I think are cool.

**[Docker Data Pull Estimator](https://github.com/seanshahkarami/docker-image-pull-size)**

This is a tool I wrote to (approximately) answer the question "How much data is needed to
pull a Docker image?"

The interesting bit of this is keeping track of the shared layers between images and giving
a useful summary to the user at each step.

This was motivated at my job with the [Sage](https://sagecontinuum.org) project. Our team and users
build on top of a core set of Docker base images. Some of are quite large (~5GB), so we try to preload them on our
edge devices to reduce network bandwidth. This tool allowed me to quickly simulate the data cost of a series of
pulls with various preload strategies.

**[Probe Memory Model](https://github.com/seanshahkarami/probe-memory-model)**

A tool which implements a few of the memory model probes discussed in [Russ Cox's fantastic "Hardware Memory Models" blog post](https://research.swtch.com/hwmm).

**[Mooseheart](/mooseheart.html)**

A cute "screensaver" which generates a random night sky each time you click on it.

**[Tracy](/tracy.html)**

A basic ray tracer which displays some nice looking metallic spheres.

**[Bongo](/bongo.html)**

I got inspired to do a web port of Bongo Cat after seeing it animated on a Satisfaction 75 keyboard. Type away... :)

_The main reference I used was [this repo](https://github.com/pedker/OLED-BongoCat-Revision). Thanks so much!_

**[Noice](https://huggingface.co/spaces/seanshahkarami/noice)**

This is a [Streamlit](https://www.streamlit.io) app for generating cool images from random noise inspired by the [accidental noise library](https://accidentalnoise.sourceforge.net).

Try it out live on [Hugging Face Spaces](https://huggingface.co/spaces/seanshahkarami/noice)!
