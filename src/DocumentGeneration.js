import React, {Component} from 'react';
import jsPDF from 'jspdf'

// Create styles

let doc = new jsPDF()

doc.text('hello world', 10, 10)
doc.save('a4.pdf');