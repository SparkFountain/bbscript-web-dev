Graphics 800, 600, 32, 2
SetBuffer BackBuffer()
Global frameTimer = CreateTimer(60)

Global image = LoadImage("../gfx/face.png")

; manipulate image
SetBuffer ImageBuffer(image)
FreeImage image
Color 255, 128, 0
Rect 20, 20, 100, 100, True
SetBuffer BackBuffer()

LockBuffer 


While Not KeyHit(1)
	WaitTimer(frameTimer)
	Cls
	
	;DrawImage image, 20, 20
	
	Flip
Wend
;~IDEal Editor Parameters:
;~C#Blitz3D