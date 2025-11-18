import layoutparser as lp
import cv2
from PIL import Image

# Load image
image = cv2.imread("../sample.png")

config_path = "lp://PubLayNet/faster_rcnn_R_50_FPN_3x/config"

model = lp.Detectron2LayoutModel(
    config_path=config_path,
    model_path="/home/chiranjan/models/publaynet/model_final.pth",
    extra_config=["MODEL.ROI_HEADS.SCORE_THRESH_TEST", 0.5],
    label_map={0: "text", 1: "title", 2: "list", 3: "table", 4: "figure"}
)

# Detect layout
layout = model.detect(image)

# Print detected blocks and classes
print("\nDetected layout blocks:")
for i, block in enumerate(layout):
    print(f"{i+1}. Class: {block.type} — BBox: {block.coordinates}")

    if block.type == "figure":
        x1, y1, x2, y2 = map(int, block.coordinates)
        crop = image[y1:y2, x1:x2]
        cv2.imwrite(f"debug_figure_{i}.png", crop)

    if block.type == "list":
        x1, y1, x2, y2 = map(int, block.coordinates)
        crop = image[y1:y2, x1:x2]
        cv2.imwrite(f"debug_list_{i}.png", crop)
