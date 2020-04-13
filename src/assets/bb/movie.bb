Graphics 800, 600, 32, 2
SetBuffer BackBuffer()
Global frameTimer = CreateTimer(60)

Global movie = OpenMovie("drop.avi")
DebugLog movie

While Not KeyHit(1)
	Cls()
	WaitTimer frameTimer
	
	DrawMovie movie, 50, 50, 320, 176
	
	Flip
Wend
End
;~IDEal Editor Parameters:
;~C#Blitz3D