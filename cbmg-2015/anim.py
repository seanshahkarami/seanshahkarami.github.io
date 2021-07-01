# Warning: The code is pretty messy! It was written in a hurry, but there still may be some interesting
# stuff here. In particular, take a look at how animation.FuncAnimation works near the end by using the
# callback to update

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

N = 100

z = np.zeros((N, N))
z[20:50, 20:50] = np.random.randint(0, 2, (30, 30))

fig = plt.figure()
plt.xlim(0, N)
plt.ylim(0, N)
mesh = plt.pcolormesh(z, cmap='bone')


def update(frame):
    i, j = np.meshgrid(np.arange(1, N-1), np.arange(1, N-1))

    count = (z[i-1, j-1] + z[i-1, j] + z[i-1, j+1] +
             z[i, j-1]               + z[i, j+1] +
             z[i+1, j-1] + z[i+1, j] + z[i+1, j+1])

    dead = z[1:-1, 1:-1] == 0
    alive = z[1:-1, 1:-1] == 1

    z[1:-1, 1:-1][alive & ((count < 2) | (count > 3))] = 0
    z[1:-1, 1:-1][dead & (count == 3)] = 1

    mesh.set_array(z.ravel())
    return mesh


anim = animation.FuncAnimation(fig, update, interval=100)

plt.show()