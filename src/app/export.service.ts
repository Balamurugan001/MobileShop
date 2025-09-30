import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToExcel(jsonData:any[],filename:string):void{
    const worksheet:XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);

    const workbook:XLSX.WorkBook = {
      Sheets:{'data':worksheet},
      SheetNames:['data']
    }

    const excelBuffer:any=XLSX.write(workbook,{bookType:'xlsx',type:'array'});

    const data:Blob = new Blob([excelBuffer],{type:'application/octet-stream'});

    FileSaver.saveAs(data,`${filename}.xlsx`)

  }

  exportToPdf(data:any[],filename:string){

    const doc = new jsPDF();

    doc.text(filename,14,15);

    const head = [Object.keys(data[0])]
    const body:(string | number)[][] = data.map(obj=>Object.values(obj));

    autoTable(doc,{
      head:head,
      body:body,
      startY:20
    })

    doc.save(`${filename}.pdf`)
  }
}
