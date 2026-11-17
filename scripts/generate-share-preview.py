"""Render the portfolio's silent, seamless social preview (not a build dependency).

Requires Pillow, NumPy, FontTools and imageio-ffmpeg; generated assets are committed.
"""
from pathlib import Path
import json, math, re, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from fontTools.pens.basePen import BasePen
from fontTools.svgLib.path import parse_path
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'artifacts/reveal-film/editing/dependencies'))
import imageio_ffmpeg

OUT = ROOT / 'public/social'
OUT.mkdir(parents=True, exist_ok=True)
SCRATCH = ROOT / 'artifacts/social-preview'
SCRATCH.mkdir(parents=True, exist_ok=True)
W, H, FPS, SECONDS = 1200, 630, 24, 8
rng = np.random.default_rng(27)
x, y = np.meshgrid(np.arange(W), np.arange(H))
haze = np.exp(-((y - 375) / 145) ** 2)
pixels = np.empty((H, W, 3))
for i, (top, warm) in enumerate(zip((17, 20, 18), (130, 76, 29))):
    pixels[:, :, i] = top + warm * haze * .74
pixels += rng.normal(0, .7, (H, W, 1))
for baseline, amplitude, phase, color in [
    (424, 25, 0, (119, 83, 43)), (468, 38, 1.6, (77, 56, 33)),
    (532, 43, 3.1, (41, 35, 26)), (615, 46, 5, (19, 23, 20)),
]:
    ridge = baseline + amplitude * np.sin(x / 280 + phase) + 9 * np.sin(x / 120 + phase)
    depth = np.clip((y - ridge) / 110, 0, 1)
    for channel, value in enumerate(color):
        pixels[:, :, channel] = np.where(y >= ridge, value * (1 - .3 * depth), pixels[:, :, channel])
base = Image.fromarray(np.uint8(np.clip(pixels, 0, 255))).convert('RGB')
sun_layer = Image.new('RGBA', (W, H))
sd = ImageDraw.Draw(sun_layer)
for cx, cy, radius in [(965, 119, 31), (1040, 171, 17)]:
    sd.ellipse((cx-radius*2,cy-radius*2,cx+radius*2,cy+radius*2),fill=(244,170,70,95))
base = Image.alpha_composite(base.convert('RGBA'), sun_layer.filter(ImageFilter.GaussianBlur(25)))
sd = ImageDraw.Draw(base)
for cx, cy, radius in [(965,119,31),(1040,171,17)]:
    sd.ellipse((cx-radius,cy-radius,cx+radius,cy+radius),fill=(247,206,129,255))

glyphs = dict(re.findall(r"([A-Z]): '([^']+)'", (ROOT/'src/components/DuneName.tsx').read_text()))
lettering = Image.new('L', (W*2,H*2))
draw = ImageDraw.Draw(lettering)
class LetterPen(BasePen):
    def __init__(self, ox, oy, scale): super().__init__(None); self.ox,self.oy,self.scale=ox,oy,scale
    def point(self,p): return ((self.ox+p[0]*self.scale)*2,(self.oy+p[1]*self.scale)*2)
    def _moveTo(self,p): pass
    def _lineTo(self,p): draw.line([self.point(self._getCurrentPoint()),self.point(p)], fill=255,width=4)
    def _curveToOne(self,a,b,c):
        start=self._getCurrentPoint()
        points=[]
        for t in np.linspace(0,1,32):
            points.append(self.point(tuple((1-t)**3*start[i]+3*(1-t)**2*t*a[i]+3*(1-t)*t*t*b[i]+t**3*c[i] for i in range(2))))
        draw.line(points,fill=255,width=4)
    def _qCurveToOne(self,a,b):
        start=self._getCurrentPoint()
        draw.line([self.point(tuple((1-t)**2*start[i]+2*(1-t)*t*a[i]+t*t*b[i] for i in range(2))) for t in np.linspace(0,1,32)],fill=255,width=4)
    def _closePath(self): pass
    def _endPath(self): pass
scale=.76
left=(W-910*scale)/2
for word, offset, row in [('ADITYA',30,0),('SINGH',105,140)]:
    for i,letter in enumerate(word): parse_path(glyphs[letter],LetterPen(left+(i*150+offset)*scale,187+row*scale,scale))
lettering=lettering.resize((W,H),Image.Resampling.LANCZOS)
font=TTFont(ROOT/'node_modules/@fontsource/share-tech-mono/files/share-tech-mono-latin-400-normal.woff2')
font.flavor=None; font.save(SCRATCH/'share-tech.ttf')
mono=ImageFont.truetype(str(SCRATCH/'share-tech.ttf'),19)
small=ImageFont.truetype(str(SCRATCH/'share-tech.ttf'),16)
copy=Image.new('RGBA',(W,H))
cd=ImageDraw.Draw(copy)
cd.text((W/2,412),'AI / ML ENGINEER',font=mono,anchor='mt',fill=(236,216,177,255),stroke_width=0)
cd.text((W/2,570),'optimistotaku.tech',font=small,anchor='mt',fill=(209,187,151,255))
particles=[(rng.uniform(0,W),rng.uniform(0,H),rng.uniform(.65,1.55),rng.uniform(.25,1)) for _ in range(72)]
def frame(t):
    picture=base.copy()
    glow=lettering.filter(ImageFilter.GaussianBlur(5))
    glow=glow.point(lambda v: int(v*(.21+.07*math.sin(2*math.pi*t/SECONDS))))
    picture=Image.composite(Image.new('RGBA',(W,H),(241,185,99)),picture,glow)
    picture=Image.composite(Image.new('RGBA',(W,H),(241,219,175)),picture,lettering)
    picture=Image.alpha_composite(picture,copy)
    dust=Image.new('RGBA',(W,H)); dd=ImageDraw.Draw(dust)
    for px,py,r,alpha in particles:
        yy=(py-t*H/SECONDS)%H
        xx=px+4*math.sin(2*math.pi*t/SECONDS+py)
        opacity=int(150*alpha*min(1,yy/65,(H-yy)/65))
        dd.ellipse((xx-r,yy-r,xx+r,yy+r),fill=(241,197,126,max(0,opacity)))
    return Image.alpha_composite(picture,dust).convert('RGB')
frame(0).save(OUT/'arrakis-card-v2.png',optimize=True)
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
command=[ffmpeg,'-y','-v','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','pipe:0','-an','-c:v','libx264','-threads','2','-preset','medium','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'arrakis-loop-v2.mp4')]
process=subprocess.Popen(command,stdin=subprocess.PIPE)
for i in range(FPS*SECONDS): process.stdin.write(frame(i/FPS).tobytes())
process.stdin.close()
if process.wait(): raise RuntimeError('Preview encode failed')
check=subprocess.run([ffmpeg,'-v','error','-i',str(OUT/'arrakis-loop-v2.mp4'),'-f','null','-'],capture_output=True,text=True,check=True)
assert not check.stderr.strip(),check.stderr
print(json.dumps({p.name:p.stat().st_size for p in OUT.iterdir()}))
