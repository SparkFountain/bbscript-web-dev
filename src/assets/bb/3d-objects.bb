Graphics3D 800, 600, 32, 2
SetBuffer BackBuffer()
Global frameTimer = CreateTimer(60)

Global camera = CreateCamera()
CameraClsColor camera, 50, 152, 220
PositionEntity camera, 0, 8, -20

Global light = CreateLight()
RotateEntity light, 90, 0, 0

Global cube = CreateCube()
PositionEntity cube, -8, 0, 0

Global sphere = CreateSphere()
PositionEntity sphere, -3, 0, 0

Global cone = CreateCone()
PositionEntity cone, 3, 0, 0

Global cylinder = CreateCylinder()
PositionEntity cylinder, 8, 0, 0

While Not KeyHit(1)
	Cls
	WaitTimer frameTimer
	
	UpdateWorld
	RenderWorld
	
	Flip 1
Wend
End
;~IDEal Editor Parameters:
;~C#Blitz3D