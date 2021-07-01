import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation


# using a gaussian-like curve as initial data
def f(x):
    return np.exp(-100.0*(x-.5)**2)


x = np.linspace(0, 1, 128)
u = f(x)
a = 2.0
dx = x[1] - x[0]         # compute dx from distance between first two x coordinates
dt = dx/np.abs(a)*0.8    # compute dt based on dx and a.
t = 0.0

fig = plt.figure()
plt.title('1D Advection Demo')
plt.xlim(0, 1)
plt.ylim(0, 1.5)
line1, = plt.plot(x, u)  # will be numerical solution
line2, = plt.plot(x, u)  # will be true solution


def update(frame):
    global t
    u[:] = u - dt * a * (u - np.roll(u, 1))/dx
    line1.set_ydata(u)
    line2.set_ydata(f((x-a*t) % 1.0))
    t += dt
    return line1


anim = animation.FuncAnimation(fig, update, interval=1000.0/60.0)
plt.show()
