# hkjc
Wayfinder for HKJC

#Hardware requirement
* Chrome
* Windows 7
* Samsung monitor

#Development
```
npm Install
gulp
```

##CanvasMap
######CanvasMap.init()
* Open small dialog
* Draw lift, smoking map icon
* Draw You are here icon and text
* Update language for Map text

######CanvasMap.clearCanvas()
* Clear a specify canvas

######CanvasMap.newPlayingAniId
* Push new animation in it, when new action triggered, disable old animations.

######CanvasMap.clearDestination()
* Disable old animations, go back to initial state

######CanvasMap.goTo()
* Called by app.js, start to draw instruction
* Draw Route to destination
* Draw all block for the destinations
* Draw destinations bubble
* if it is leading-edge or farrier-on-6 (special case) update tip 3 instruction

######CanvasMap.drawDestinationBubble()
* Draw destinations bubble for 2/F

######CanvasMap.changeTips()
* Play tips

######CanvasMap.drawBlock()
* Draw Block for 2/F, G/F, 6/F
* if it is other-public-venue, draw common life icon

######CanvasMap.drawLiftArrow()
* Draw arrow when the lift is moving

######CanvasMap.toPoints()
* Animating the guideline for other-public-venue

######CanvasMap.drawRoute()
* Draw route for 2/F

######CanvasMap.drawRouteGF()
* Draw route for G/F

######CanvasMap.drawRoute6F()
* Draw route for 6/F

######CanvasMap.drawPoints()
* Common draw function called by drawRoute

######CanvasMap.fadeIn()
* Fade in a canvas

######CanvasMap.drawArrow()
* Draw arrow with certain angle

######CanvasMap.changeLang()
* Change language

######CanvasMap.redrawMapText()
* Clear canvases
* Update MapText language

######CanvasMap.drawMapText()
* Draw a Map text

######CanvasMap.drawCommonMapText()
* Draw Common Layer Map text

######CanvasMap.drawMapIcons()
* Draw Map icons

######CanvasMap.drawYouAreHereIcons()
* Draw You are here icons

######CanvasMap.drawYouAreHereText()
* Draw You are here text

######CanvasMap.drawYouAreHereArrow()
* Draw You are here arrow

######CanvasMap.clearGroundFloor()
* Clear Ground floor

######CanvasMap.drawOtherVenueTransition()
* Transition animation between floors

######CanvasMap.dropIn()
* Drop in canvas


#Installation in Windows
Copy the folder.
Run `start_x.bat` where x is specified for each machine.
1 is the one closest to the lift. On the right side of the map.
2 is the middle one.
3 is on the left side of the map.

#Remark on setting up the machine
1. Disable Chrome update
2. Text DPI
3. Check if all default monitor features is disabled (two finger click, long press, monitor edge)
4. Need a Chinese Guideline for clerks who are working in HKJC (Reference: https://drive.google.com/open?id=0B4nDkpvMYAaRNXVTOS1YWUVRc0k )
