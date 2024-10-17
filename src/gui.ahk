; Create the GUI window
Gui, Add, Text, , Retailer:
Gui, Add, Edit, vRetailer w300, ; Retailer input field

Gui, Add, Text, , Extra:
Gui, Add, Edit, vExtra w300, ; Extra information input field

Gui, Add, Text, , Drag and drop files or directories here:
Gui, Add, Edit, vFileInput w300 h100 ReadOnly ; File input field for drag and drop

; Add a button to trigger the renaming process
Gui, Add, Button, gRename, Rename

; Show the window
Gui, Show, , File Renamer

; Set up drag-and-drop for files
GuiDropFiles:
    GuiControl, , FileInput, % A_GuiEvent ; Display the dropped files in the input field
return

Rename:
    ; Get the input values from the fields
    GuiControlGet, Retailer
    GuiControlGet, Extra
    GuiControlGet, FileInput
    
    ; Ensure at least one file or directory is provided
    if (FileInput = "") {
        MsgBox, Please provide at least one file or directory.
    return
}

; Build the command line argument
command := "name-ln.exe"
if (Retailer != "") {
    command .= " --retailer """ Retailer """" ; Quote the retailer input
}
if (Extra != "") {
    command .= " --extra """ Extra """" ; Quote the extra input
}
command .= " """ FileInput """" ; Quote the file input

; Run the command
Run, %ComSpec% /c %command%, , Hide

; Notify the user
MsgBox, Rename operation completed.
return

; Close the GUI when the user closes the window
GuiClose:
    ExitApp