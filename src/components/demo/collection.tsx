import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { useReactToPrint } from 'react-to-print'
  import axios from "axios";
  // import html2pdf from 'html2pdf.js'
  import { useEffect, useState, useRef } from "react";
  import { useParams } from "react-router"
  import { Button } from "@/components/ui/button"
  import { NavBar } from "./navBar";
  import saarlogo from '../image/saarlog.jpg'
  
  
  export function Collection() {
    const {  startDate, endDate, intermediate } = useParams<{intermediate: string, startDate: string, endDate: string}>()
  
  type TvalueTable = {
    CODE_UNITE: number,
    RAISOCIN: string
    MODEPAIE: number
    LIBEMODE: string
    TOTAL_MONTANT: number
    NOMBRE: number
  }
  const conponentPDF= useRef()
  
  const handleOnClick= useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: 'Userdata',
    
  })
  //  const html2pdf = await require('html2pdf.js')
    // const element = document.querySelector('#myTable')
    // html2pdf(element, {
    //   marginTop: 10
    // })
  
   
    const [valueTable, setValueTable] = useState<TvalueTable[]>([])
  useEffect(() => {
     const  getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8803/reporting-app/collects/getAll?fromDate=${startDate}&toDate=${endDate}&intermediate=${intermediate}`)
        setValueTable(data.data)
        console.log(valueTable)
      } catch (error) {
         console.log('I have a problem :', error)
      }
         console.log(valueTable)
      }
      getData()
  }, [])
   
    return (
    <div>
        <NavBar startDate={startDate}  endDate={endDate} intermediate={intermediate} />
           <div ref={conponentPDF} style={{width: '100%', marginTop: '50px'}}>
            <h1 className="text-center text-gray-600 text-3xl font-bold @apply uppercase mb-9">Collection</h1>
            <span><img className="w-[150px] h-[150px] rounded-[50%] ml-[44%] -mt-10 " src={saarlogo} alt="" /></span>
        <Table    id="myTable" className="border-collapse  bg-cover ">
        <TableCaption>A list of your collection</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead  className="w-[300px]" >Collection mode</TableHead>
            <TableHead className="w-[300px]"> NOMBRE</TableHead>
            <TableHead className="w-[300px]">TOTAL MONTANT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {valueTable?.map((value, idx) => (
            <TableRow key={idx}> 
              <TableCell className="font-medium">{value.LIBEMODE}</TableCell>
              <TableCell>{value.NOMBRE}</TableCell>
              <TableCell>{value.TOTAL_MONTANT}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter data-html2canvas-ignore >
          <TableRow >
            <TableCell  className="text-left" colSpan={7}></TableCell>
          </TableRow>                             
        </TableFooter>
      </Table>
      </div>
         <Button  style={{background: 'hsl(217.9 10.6% 64.9%)', marginLeft: '88%',}} className="bg-['hsl(217.9 10.6% 64.9%)]  mb-7 p-auto" onClick={handleOnClick} variant="outline">generate pdf</Button>
      </div>
      
     
    )
  }
  