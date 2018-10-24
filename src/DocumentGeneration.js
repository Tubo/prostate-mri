import React, {Component} from 'react';
import saveAs from 'file-saver'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import Docxtemplater from 'docxtemplater'
import ImageModule from 'open-docxtemplater-image-module'

import template from "./report_template.docx"


export default async function loadImages(data) {
    const image = await new Response(data.lesions[0].images.t2w).arrayBuffer();

    generate_document(data, image)
}

function loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
}

function generate_document(data, image) {
    loadFile(template, function (error, content) {
        if (error) {
            throw error
        }

        const zip = new JSZip(content),
            imageModule = new ImageModule({
                centered: false,
                getImage: (file) => file,
                getSize: () => [200, 200],
            }),
            doc = new Docxtemplater()
                .attachModule(imageModule)
                .loadZip(zip);

        doc.setData({
            name: 'John',
            image: image,
        });

        try {
            doc.render()
        }
        catch (error) {
            const e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            };
            console.log(JSON.stringify({error: e}));
            throw error;
        }
        const out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(out, "report.docx")
    })
}

