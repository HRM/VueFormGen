import { defineStore } from "pinia";
import { ref } from "vue";

export const useTableOfContents = defineStore("tableOfContents", ()=>{
    const contents = ref([] as {title: string, id: string}[])
    function addContent(title: string, id: string){
        contents.value.push({title, id})
    }

    function removeContent(id: string){
        const index = contents.value.findIndex(content => content.id === id)
        if(index !== -1){
            contents.value.splice(index, 1)
        }
    }
    return {
        contents,
        addContent,
        removeContent
    }
}) 