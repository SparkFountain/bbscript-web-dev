Graphics 800, 600, 32, 2
SetBuffer BackBuffer()
Global frameTimer = CreateTimer(60)

;Global stream = WriteFile("../txt/test.sav")
;WriteString(stream, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
;WriteInt(stream, 42)
;WriteByte(stream,8)
;CloseFile stream

Global stream = ReadFile("../txt/test.sav")
Global loremIpsum$ = ReadString(stream)
Global offset = SeekFile(stream, 16)
Global answerOnAll = ReadInt(stream)
Global eight = ReadByte(stream)
CloseFile stream

Print offset
Print loremIpsum
Print answerOnAll
Print eight
WaitKey
End

;While Not KeyHit(1)
;	WaitTimer(frameTimer)
;	Cls
;	
;	;DrawImage image, 20, 20
;	
;	Flip
;Wend
;~IDEal Editor Parameters:
;~C#Blitz3D