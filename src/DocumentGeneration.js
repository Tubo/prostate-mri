import React, {Component} from 'react';
import saveAs from 'file-saver'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import Docxtemplater from 'docxtemplater'

import template from "./report_template.docx"


export default function generateDoc(data) {
    generate_document(data);
}

function loadFile(url,callback){
    JSZipUtils.getBinaryContent(url,callback);
}

function generate_document() {
    loadFile(template, function(error,content){
        if (error) { throw error }

        const zip = new JSZip(content),
            doc=new Docxtemplater().loadZip(zip);

        doc.setData({
            name: 'John',
            last_name: 'Doe',
            phone: '0652455478',
            description: 'New Website'
        });
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        }
        catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({error: e}));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }
        var out=doc.getZip().generate({
            type:"blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })
        saveAs(out,"report.docx")
    })
}
