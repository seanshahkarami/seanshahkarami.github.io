import numpy as np
from scipy.fft import fftn, ifftn, fftshift, fftfreq
import streamlit as st
import matplotlib.pyplot as plt
import subprocess

image_seed = st.sidebar.slider('Image Seed', 0, 10000, 0)
transform_seed = st.sidebar.slider('Transform Seed', 0, 10000, 0)
transform_level = st.sidebar.slider('Transform Level', 0.0, 100.0, 0.0)


def random_channel(n, rand, fpower=2.0):
    freq = fftn(rand.rand(n, n))

    fx = fftfreq(n)[:, None]
    fy = fftfreq(n)[None, :]

    # combine as l2 norm of freq
    f = (fx**2 + fy**2)**0.5

    i = f > 0
    freq[i] /= f[i]**fpower
    freq[0, 0] = 0.0

    data = np.real(ifftn(freq))
    data -= data.min()
    data /= data.max()
    return data

@st.cache
def random_gray(n, seed, fpower=2.0):
    rand = np.random.RandomState(seed)
    return random_channel(n, rand, fpower)

@st.cache
def random_color(n, seed):
    rand = np.random.RandomState(seed)
    return np.stack([random_channel(n, rand) for _ in range(3)], 2)


def rotate_image(img, i, j, a):
    c = np.cos(a)
    s = np.sin(a)

    img = 2.0*img-1.0
    x, y = img[:, :, i], img[:, :, j]
    img[:, :, i], img[:, :, j] = c * x + s * y, -s * x + c * y
    img -= img.min()
    img /= img.max()
    return img

n = 512
img = random_color(n, image_seed)

a = random_color(n, transform_seed) * transform_level
img = rotate_image(img, 0, 1, a[:, :, 0])
img = rotate_image(img, 0, 2, a[:, :, 1])
img = rotate_image(img, 1, 2, a[:, :, 2])

'''
# Output

Play around with the parameters on the left to change the image.
'''

st.image(img, width=600)

'''
The image is generated as follows:

1. Generate 6D cube of "brownian noise". We'll name these coordinates (R, G, B, A1, A2, A3).
2. Apply a rotation of angle A1*Level to (R, G) plane.
3. Apply a rotation of angle A2*Level to (R, B) plane.
4. Apply a rotation of angle A3*Level to (G, B) plane.
5. The resulting (R, G, B) data is the image.

# Background

I was inspired to write this after seeing some neat examples from the [accidental noise library](http://accidentalnoise.sourceforge.net).

My approach to doing this was:

1. Generate nice looking 2D noise. I found that a 2D analog of [brownian noise](https://en.wikipedia.org/wiki/Colors_of_noise#Brownian_noise) looked pretty good.
2. Stack 6 independent channels to form the 6D cube.
3. Apply the rotations outlined above.

Out of these steps, I found the most interesting bit to be generating the 2D noise.

There seem to be many approaches for doing this, including classic approaches like [Perlin](https://en.wikipedia.org/wiki/Perlin_noise) and [Simplex](https://en.wikipedia.org/wiki/Simplex_noise) noise. Since I had access to good numeric libraries, I ended up going straight to the following FFT based approach.

First, we generate a 2D image of uniformly sampled random noise. It pretty much looks like the static on your TV a.k.a. white noise.
'''

st.image(random_gray(512, 32, 0.0))

'''
White noise looks pretty harsh, so we want to smooth it out to get brownian noise.

To do this, we take the 2D FFT to get to the frequency domain and then rescale things so they fall off like 1/f^2. To be nitpicky, I only found a general definition of brownian noise in 1D. Still... we're doing something very similar by rescaling by "one over the Euclidean norm squared".

Finally, we take the inverse 2D FFT to get our image back.
'''

st.image(random_gray(512, 32))

'''
Noice!
'''

if st.sidebar.button('Save Video'):
    for i, level in enumerate(np.linspace(0, 100.0, 300)):
        img = random_color(n, image_seed)
        a = random_color(n, transform_seed) * level
        img = rotate_image(img, 0, 1, a[:, :, 0])
        img = rotate_image(img, 0, 2, a[:, :, 1])
        img = rotate_image(img, 1, 2, a[:, :, 2])
        plt.imsave(f'frames/{i:03d}.jpg', img)

    filename = f'videos/{image_seed}-{transform_seed}.mp4'
    subprocess.check_call(['ffmpeg', '-y', '-framerate', '10', '-i', 'frames/%03d.jpg', filename])

st.sidebar.text('(Requires ffmpeg)')