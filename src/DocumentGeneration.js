import React, {Component} from 'react';
import * as docx from 'docx';
import saveAs from 'file-saver'

// Create styles

export default function generateDoc(data) {
    const doc = new docx.Document();

    doc.Header.createParagraph('NHI: ');

    doc.addParagraph(heading('title', 'Prostate MRI Report').center());

    doc.addParagraph(heading('heading1', 'Clinical History'));
    let history_content = new docx.Paragraph(data.history);
    doc.addParagraph(history_content);

    doc.addParagraph(heading('heading1', 'Biopsy Results'));
    let biopsy_content = new docx.Paragraph(data.biopsy);
    doc.addParagraph(biopsy_content);

    doc.addParagraph(heading('heading1', 'Prostate Assessment'));
    let prostate_metrics_wording = `Volume ${data.volume || "N/A"}, dimension: ${data.dim_x}, ${data.dim_y}, ${data.dim_z}`
    let prostate_metrics_content = new docx.Paragraph(prostate_metrics_wording);
    doc.addParagraph(prostate_metrics_content);

    doc.addParagraph(heading('heading1', 'Lesions'));
    data.lesions.map(lesion => {
        appendLesionDescription(doc, lesion)
    });

    downloadDocx(doc);
}

function downloadDocx(doc) {
    let exporter = new docx.Packer();
    exporter.toBlob(doc).then(blob => {
        saveAs(blob, 'report.docx');
    })
}

function heading(level, text) {
    return new docx.Paragraph(text)[level]();
}


function appendLesionDescription(doc, lesion) {
    const images = lesion.images,
        images_number = lesions.images_number,
        zone = lesion.zone,
        scores = lesion.scores,
        extension = lesion.extension,
        comment = lesion.comment;

    let paragraph = new docx.Paragraph(),
        header = new docx.TextRun(zone);

    doc.createImage(images.t2w);
    doc.createImage(images.dwi);
    doc.createImage(images.dce);
}
