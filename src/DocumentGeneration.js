import React, {Component} from 'react';
import * as docx from 'docx';
import saveAs from 'file-saver'

// Create styles

export function generateDoc(data) {
    let doc = new docx.Document();

    doc.Header.createParagraph('MRI Prostate report');

    let title = new docx.Paragraph('Prostate MRI Report').title().center();
    doc.addParagraph(title);

    let history_heading = new docx.Paragraph('Clinical History').heading1();
    doc.addParagraph(history_heading);
    let history_content = new docx.Paragraph(data.history);
    doc.addParagraph(history_content);

    let biopsy_heading = new docx.Paragraph('Biopsy results').heading1();
    doc.addParagraph(biopsy_heading);
    let biopsy_content = new docx.Paragraph(data.biopsy);
    doc.addParagraph(biopsy_content);

    let prostate_metrics_heading = new docx.Paragraph('Prostate Metrics').heading1();
    doc.addParagraph(prostate_metrics_heading);
    let prostate_metrics_wording = `Volume ${data.volume}, dimension: ${data.dim_x}, ${data.dim_y}, ${data.dim_z}`
    let prostate_metrics_content = new docx.Paragraph(prostate_metrics_wording);
    doc.addParagraph(prostate_metrics_content);

    data.lesions.map(lesion => {

    });

    downloadDocx(doc);
}

function downloadDocx(doc) {
    let exporter = new docx.Packer();
    exporter.toBlob(doc).then(blob => {
        saveAs(blob, 'report.docx');
    })
}

function lesionDescription(lesion, doc) {
    let images = lesion.images,
        zone = lesion.zone,
        scores = lesion.scores,
        extension = lesion.extension,
        comment = lesion.comment;

    let paragraph = new docx.Paragraph(),
        header = new docx.TextRun(zone)
}