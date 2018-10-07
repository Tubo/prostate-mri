import React, {Component} from 'react';
import ReactPDF, {Document, Page, Text, View, StyleSheet, PDFDownloadLink} from '@react-pdf/renderer';
import {Button} from 'reactstrap'

// Create styles
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

// Create Document Component
function MyDocument(text) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Clinical Information</Text>
                    <Text></Text>
                    <Text></Text>
                </View>
                <View style={styles.section}>
                    <Text>Lesions</Text>
                </View>
            </Page>
        </Document>
    )
}


export function DocumentDownloadLink(props) {
    let document = MyDocument(props);

    return (
        <div>
            <PDFDownloadLink document={document} fileName="report.pdf">
                <Button color="success">Generate PDF</Button>
            </PDFDownloadLink>
        </div>
    );
}
