Graphics 800, 600, 32, 2
SetBuffer BackBuffer()
Global frameTimer = CreateTimer(60)

ClsColor 50, 152, 220


While Not KeyHit(1)
	Cls
	WaitTimer frameTimer
	
	; meadow
	Color 92, 184, 92
	Rect 0, 250, 800, 350
	
	; house
	Color 217, 83, 79
	Rect 50, 150, 200, 200
	Line 50, 150, 150, 50
	Line 150, 50, 250, 150
	
	; door
	Color 134, 148, 164
	Rect 130, 270, 40, 80
	
	; window
	Color 43, 62, 80
	Rect 65, 190, 50, 50
	
	; clouds
	Color 240, 240, 240
	Oval 20, 10, 60, 20
	Oval 330, 40, 120, 50
	Oval 380, 75, 90, 30
	Oval 500, 140, 140, 40
	
	; sun
	Color 240, 173, 78
	Oval 600, 10, 60, 60
	
	
	Flip 1
Wend
End
;~IDEal Editor Parameters:
;~C#Blitz3D