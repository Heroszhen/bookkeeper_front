import './Files.css';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { readFile } from '../../services/UtilService';

export default function Files(props){
    const[files, setFiles] = useState([]);
    const[dragActive, setDragActive] = useState(false);
    const[files2, setFiles2] = useState([]);
    const maxBytes = 2097152;
    const[number, setNumber] = useState(0);

    useEffect(() => {
        props.setPage("files")
    }, []);

    function handleFiles(e){
        for(let entry of e.target.files)setFiles(files=>[...files, entry]);
    }
    function deleteFile(index){
        setFiles(files.filter((item, key)=>key !== index))
    }

    function dragEnter(e){
        e.preventDefault();
        setDragActive(true);
    }
    function dragLeave(e){
        e.preventDefault();
        setDragActive(false);
    }
    async function drop(e, drop = false){
        e.preventDefault();
        setDragActive(true);
        if(drop === true){
            setDragActive(false);
            let tab = [];
            let items = e.dataTransfer.items;
            for(let i = 0;i < items.length;i++){
                //FileSystemEntry
                let entry = e.dataTransfer.items[i].webkitGetAsEntry();
                if(entry.isFile){
                    tab.push(e.dataTransfer.files[i])
                }else{
                    await readDirectory(entry, tab);
                }
            }
            setFiles(files.concat(tab));
        }
    }

    async function readDirectory(directory, tab){
        return new Promise((resolve, reject) => {
            let reader = directory.createReader();
            reader.readEntries(async entries=>{
                for(let entry of entries){
                    if(entry.isFile){
                        //entry.fullPath
                        let fe = await readFileEntry(entry);
                        tab.push(fe);
                    }else{
                        await readDirectory(entry, tab);
                    }
                }
                resolve(1)
            }, (error) => {
            });
        });
    }

    async function readFileEntry(fe){
        return new Promise((resolve, reject) => {
            fe.file(file=>{
                resolve(file)
            })
        });
    }

    //https://www.douyin.com/video/7203617378331118907
    async function sendFiles(){
        for(let item of files){
            if(item.size > maxBytes){console.log(item)
                let id = uuid();
                let chunks = cutFile(item);console.log(chunks)
                
            }
        }
    }

    /**
     * 
     * @param {File} file 
     * @returns {Array<Blob>}
     */
    function cutFile(file){
        let tab = [];
        let start = 0, end;
        while(true){
            end = start + maxBytes;
            if(end > file.size)end = file.size;
            tab.push(file.slice(start, end));console.log(start, end)
            if(end === file.size)break;
            start = end + 1;
        }
        return tab;
    }
    
    return (
        <div id="files" className='template undernav'>
            <div className='container'>
                <div className='row pt-3'>
                    <section className='col-12 h2 mb-3'>
                        Les utilisateurs
                    </section>
                    
                    <section className="col-12">
                        <div id="wrap-upload-files">
                            <section className='mb-2'>
                                <div className="mb-2">
                                    <label htmlFor="uploadfiles" className="form-label">Télécharger des fichiers</label>
                                    <input className="form-control form-control-sm" type="file" id="uploadfiles" onChange={handleFiles} multiple />
                                </div>
                                <div>
                                    <label htmlFor="uploadfolders" className="form-label">Télécharger un dossier</label>
                                    <input className="form-control form-control-sm" type="file" id="uploadfolders" onChange={handleFiles} webkitdirectory="true" multiple />
                                </div>
                                <div className='wrap-btn'>
                                    <button type="button" className='btn btn-primary' onClick={sendFiles} disabled={files.length === 0}>Envoyer</button>
                                </div>
                            </section>
                            <section>
                                <label htmlFor="dragdrop" draggable className={dragActive === true ? "active" : ""} onDragEnter={(e)=>dragEnter} onDragLeave={(e)=>dragLeave} onDrop={(e)=>drop(e, true)} onDragOver={(e)=>drop(e)} >Glisser des fichiers ou un dossier</label>
                                <input type="file" className='d-none' id="dragdrop" name="dragdrop" multiple />
                            </section>
                        </div>
                    </section>

                    {files.length > 0 &&
                        <section className='col-12'>
                            <div id="list-files">
                                {
                                    files.map((item, index)=>{
                                        return <article key={index}>
                                            <div className='x-delete' onClick={()=>deleteFile(index)}>X</div>
                                            <div>{item.name}</div>
                                        </article>
                                    })
                                }
                            </div>
                        </section>
                    }

                    <section className='col-12'>

                    </section>
                </div>
            </div> 
        </div>
    )
}