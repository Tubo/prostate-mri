import React, {Component} from 'react';
import saveAs from 'file-saver'
import {readAsArrayBuffer} from 'promise-file-reader'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import Docxtemplater from 'docxtemplater'
import ImageModule from 'open-docxtemplater-image-module'

import template from "./report_template.docx"


export default async function generate_document(data) {
    for (let i=0; i<data.lesions.length; i++) {
        let lesion = data.lesions[i];
        let images = lesion.images;
        let keys = Object.keys(images);

        for (let j=0; j<keys.length; j++) {
            let currentImage = images[keys[j]];
            images[keys[j]] = await readAsArrayBuffer(currentImage);
        }
        console.log(images)
    }
    return load_render_download(data)
}

function loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
}


function load_render_download(data) {
    loadFile(template, function (error, content) {
        if (error) {
            throw error
        }

        const zip = new JSZip(content);
        const imageModule = new ImageModule({
            centered: false,
            getImage: (file) => file,
            getSize: () => [200, 200],
        });
        const doc = new Docxtemplater()
            .attachModule(imageModule)
            .loadZip(zip);

        doc.setData(data);
        doc.render();

        const out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(out, "report.docx")
    })
}

