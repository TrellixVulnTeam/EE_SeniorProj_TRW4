import { Box, Button, Center, IconButton, Text } from '@chakra-ui/react'
import React, { Component, useCallback, useEffect, useReducer, useRef } from 'react'
import { Flex, HStack, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
import ChildMenuButton from 'src/global-components/MenuButtons/ChildMenuButton'
import TopMenuButton from 'src/global-components/MenuButtons/TopMenuButton'
import useKeyboardShortcut from './use-keyboard-shortcut'
import upArrow from 'src/assets/upArrow.png'

declare var window: any;


export default function Reader() {
    const [page_urls, setUrls] = React.useState([""]);
    const [page_count, setCount]  = React.useState(0);
    const [cur_page, setPage] = React.useState(0);

    useKeyboardShortcut(["ArrowLeft"], 
        () => { if (cur_page > 0) setPage(cur_page - 1)}
    )
    useKeyboardShortcut(["ArrowRight"], 
        ()=>{ if (cur_page < page_count-1) setPage(cur_page + 1)}
    )


    useEffect( () => {
        window.ipcRenderer.on(
            'nested-images-base64', (event:any, base64:string[]) => {
                setUrls(base64);
                setCount(base64.length);
                setPage(0);
            }
        )
    }, [])

    const selectDirectory = () => {
        // alert(this.state.page_urls)
        window.ipcRenderer.send('open-dir-dialog');
    }

    const renderPage = () => {
        return (<Center marginTop="25px">
            {page_urls[0]!=="" ? 
                
                <img 
                    height="600px"
                    src={`data:image/png;base64,${page_urls[cur_page]}`} 
                    alt={`NOT WORKING!`} 
                /> 
                :
                <VStack>
                    <IconButton 
                        aria-label="load-comic" 
                        icon={<AttachmentIcon boxSize="50px"/>} 
                        onClick={selectDirectory} 
                        marginTop={"0px"} bgColor="orange.300"  boxSize="100px"
                        _hover={{backgroundColor: "orange.400"}}
                        borderRadius="100px"
                    />
                    <img src={upArrow} />   
                    <Text color="blackAlpha.600" userSelect='none'> Begin by uploading your comic above! </Text>
                </VStack>
            }
            </Center>
        )
    }
    
    const renderPageCount = () => {
        return (
            <Center>
            {page_urls[0]!=="" ? 
                `Current Page: ${cur_page} / ${page_count-1}` 
                : ``
            }
            </Center>
        )
    }

    return (
        <Box w="100%" h="100%" overflowY="hidden">
            <Box h="32px" w={'100%'} bgColor="#343434"> 
                <Flex w={"100%"} h={"32px"} flexGrow={0} color="whiteAlpha.900">

                    <TopMenuButton menuName="File">
                        <ChildMenuButton name="Open Folder" onClick={()=>{selectDirectory()}}/>
                        <ChildMenuButton name="Open Recent" onClick={selectDirectory}/>
                        <ChildMenuButton name="Save Project" onClick={()=>{}}/> 
                        <ChildMenuButton name="Exit project" onClick={()=>{}}/>
                    </TopMenuButton>

                    <TopMenuButton menuName="Edit"> 
                    </TopMenuButton>
                    
                    <TopMenuButton menuName="View">
                        <ChildMenuButton name="Fullscreen" onClick={()=>{}}/>
                    </TopMenuButton>

                    <TopMenuButton menuName="About" onClick={()=>{}}>
                    </TopMenuButton>
                </Flex>

            </Box>
        {renderPage()}
        {renderPageCount()}
        </Box>
    )
}
