import React, {Component} from 'react';
import saveAs from 'file-saver'
import {readAsArrayBuffer} from 'promise-file-reader'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import Docxtemplater from 'docxtemplater'
import ImageModule from 'open-docxtemplater-image-module'

import template from "./report_template.docx"
import { lexicon} from "./data";


export default async function generate_document(state_data) {
    const data = Object.assign({}, state_data);

    for (let i = 0; i < data.lesions.length; i++) {
        let lesion = data.lesions[i];
        let images = lesion.images;
        let keys = Object.keys(images);
        lesion.images_buffer = {}

        for (let j = 0; j < keys.length; j++) {
            let currentImage = images[keys[j]];
            lesion.images_buffer[keys[j]] = await readAsArrayBuffer(currentImage);
        }
        console.log(images)
    }
    inject_lexicon(data);
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
            getSize: () => [220, 220],
        });
        const doc = new Docxtemplater()
            .attachModule(imageModule)
            .loadZip(zip)

        doc.setOptions({parser: index_parser})
        doc.setData(data);
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
            console.log(JSON.stringify(e));
            // Handle error
        }

        const out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(out, "report.docx")
    })
}

function index_parser(tag) {
    return {
        get(scope, context) {
            if (tag === "$index") {
                const indexes = context.scopePathItem;
                return indexes[indexes.length - 1] + 1;
            }
            return scope[tag];
        },
    };
}

function inject_lexicon(data) {
    const lesions = data.lesions;

    lesions.forEach(lesion => {
        let zone = lesion.zone;
        let scores = lesion.scores;

        if (zone === 'cz' || zone === 'as') {
            lesion.scores = null
        } else {
            lesion.scores['total_lex'] = lexicon.total[scores.total];
            lesion.scores['dwi_lex'] = lexicon.dwi[scores.dwi];
            lesion.scores['dce_lex'] = lexicon.dce[scores.dce];
            lesion.scores['t2w_lex'] = zone === 'pz' ? lexicon.t2w_pz[scores.t2w] : lexicon.t2w_tz[scores.t2w]
        }

        switch (zone) {
            case 'cz' :
                lesion.zone_lex = 'central zone'
                break
            case 'pz' :
                lesion.zone_lex = 'peripheral zone'
                break
            case 'tz' :
                lesion.zone_lex = 'transitional zone'
                break
            case 'as' :
                lesion.zone_lex = 'anterior stroma'
        }
    })
}
