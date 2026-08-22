"""Build the site icons from the DA monogram in the brand logo.

Run from the project root when the logo changes; the icons it writes are
committed, so this is not part of the build:

    python3 scripts/make-icons.py     # needs Pillow

The logo file draws the navy monogram on an opaque white box next to a white
wordmark, so the mark's shape comes from its darkness rather than from alpha:
inverted luminance gives a clean, anti-aliased mask we can paint white on navy.
"""
from PIL import Image, ImageChops, ImageOps

NAVY = (10, 32, 56, 255)  # --navy-900
MONOGRAM_COLUMNS = (71, 481)
MARK_RATIO = 0.80  # how much of the square the monogram fills; the serifs need the room at 16px
EDGE_THRESHOLD = 40

source = Image.open('public/images/logo-diamond-advocates.png').convert('RGBA')
box = source.crop((MONOGRAM_COLUMNS[0], 0, MONOGRAM_COLUMNS[1], source.height))
# Flatten onto white first: transparent padding would otherwise read as black (mark).
box = Image.alpha_composite(Image.new('RGBA', box.size, (255, 255, 255, 255)), box).convert('RGB')

# Navy strokes -> opaque, white surround -> transparent.
mask = ImageOps.invert(box.convert('L'))
mask = ImageChops.multiply(mask, mask.point(lambda v: 255 if v > EDGE_THRESHOLD else 0))
mask = mask.crop(mask.point(lambda v: 255 if v > EDGE_THRESHOLD else 0).getbbox())
# The navy is not pure black, so stretch the mask to reach full opacity.
peak = max(mask.getextrema()[1], 1)
mask = mask.point(lambda v: min(255, round(v * 255 / peak)))

white_mark = Image.new('RGBA', mask.size, (255, 255, 255, 255))
white_mark.putalpha(mask)


def render(size: int) -> Image.Image:
    canvas = Image.new('RGBA', (size, size), NAVY)
    target = int(size * MARK_RATIO)
    scale = min(target / white_mark.width, target / white_mark.height)
    mark = white_mark.resize(
        (max(1, round(white_mark.width * scale)), max(1, round(white_mark.height * scale))),
        Image.LANCZOS,
    )
    canvas.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))
    return canvas


render(512).save('app/icon.png')
render(180).convert('RGB').save('app/apple-icon.png')
render(256).save('app/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print('monogram', white_mark.size, '-> app/icon.png, app/apple-icon.png, app/favicon.ico')
