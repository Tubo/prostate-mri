import React, {Component} from 'react';
import {Document, Page, Text, View, StyleSheet, PDFDownloadLink} from '@react-pdf/renderer';
import {Button} from 'reactstrap'

// Create styles

export function DocumentDownloadLink(props) {
    return (
        <div>
            <PDFDownloadLink document={documentTree()} fileName="report.pdf">
                <Button color="success">Generate PDF</Button>
            </PDFDownloadLink>
        </div>
    );
}

function documentTree()
{
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#ffffff'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    let history = 'hello world'

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Clinical Information</Text>
                    <Text>John Doe is a 56M with difficulty passing urine.</Text>
                    <Text>Biopsy showed high grade invasive prostatic cancer</Text>
                </View>
                <View style={styles.section}>
                    <Text>Lesions</Text>
                </View>
            </Page>
        </Document>
    )
}
;

