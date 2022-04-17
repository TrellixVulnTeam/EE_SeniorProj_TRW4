import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, IconButton } from '@chakra-ui/react'
import React from 'react'


type popupProps = {
  token: string,
  sentence: string,
  definitions: string, // probably a list tbh
}
declare var window: any;
export default function WordPopup(props:popupProps) {

  const ipcSendNote = () => {
    window.ipcRenderer.send("addNote", {
      "word":props.token, 
      "definition":props.definitions,
      "sentence":props.sentence,
    })
  }
  return (
    <Box  className="popup"
    backgroundColor={"#fafafa"} position={'absolute'} left={100} top={100}
    >
      <div>
        <span className="popup-word">{props.token}</span>
        <IconButton aria-label='Search database' icon={<AddIcon/>} isRound={true} colorScheme={'green'} size="xs" 
        onClick={ipcSendNote}
        />
      </div>
      <hr></hr>
      <h2 className='popup-sentence'>{props.sentence}</h2>
      <h2 className='popup-definition'>{props.definitions}</h2>
      ...
    </Box>
  )
}
