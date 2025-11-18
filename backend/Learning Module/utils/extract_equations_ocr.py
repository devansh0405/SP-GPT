from pix2tex.cli import LatexOCR
from PIL import Image

model = LatexOCR()
img = Image.open("../sample.png")
img.show()
latex = model(img)

with open("output.tex", "w") as f:
    f.write("\\documentclass{article}\n\\begin{document}\n")
    f.write(latex)
    f.write("\n\\end{document}")
