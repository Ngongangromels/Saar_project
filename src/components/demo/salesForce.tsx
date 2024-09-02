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
  import { useEffect, useState, useRef } from "react";
  import { useParams } from "react-router"
  import { Button } from "@/components/ui/button"
  import { NavBar } from "./navBar";
  import saarlogo from '../image/saarlog.jpg'
  
  
  export function SalesFarce() {
    const {  startDate, endDate, intermediate } = useParams<{intermediate: string, startDate: string, endDate: string}>()
  
  type TvalueTable = {
    CODEINTE: number,
    RAISOCIN: string
    CODTYPAV: number
    LIBTYPAV: string
    NOMBRE: number
  }
  const conponentPDF= useRef()
  
  const handleOnClick= useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: 'Userdata',
    
  })
 
   
    const [valueTable, setValueTable] = useState<TvalueTable[]>([])
  useEffect(() => {
     const  getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8803/reporting-app/saleForces/getAll?fromDate=${startDate}&toDate=${endDate}&intermediate=${intermediate}`)
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
            <h1 className="text-center text-gray-600 text-3xl font-bold @apply uppercase mb-9">Sales force </h1>
            <span><img className="w-[150px] h-[150px] rounded-[50%] ml-[44%] -mt-10 " src={saarlogo} alt="" /></span>
        <Table  id="myTable" className="border-collapse">
        <TableCaption>A list of your sales force</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Code</TableHead>
            <TableHead>Libelle intermediaire</TableHead>
            <TableHead>CODTYPAV</TableHead>
            <TableHead className="">LIBTYPAV</TableHead>
            <TableHead className=""> NOMBRE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {valueTable?.map((value, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{value.CODEINTE}</TableCell>
              <TableCell>{value.RAISOCIN}</TableCell>
              <TableCell>{value.LIBTYPAV}</TableCell>
              <TableCell>{value.CODTYPAV}</TableCell>
              <TableCell>{value.NOMBRE}</TableCell>
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
         <Button  style={{background: 'hsl(217.9 10.6% 64.9%)', marginLeft: '88%',}} className="mb-7 p-auto" onClick={handleOnClick} variant="outline">generate pdf</Button>
      </div>
      
     
    )
  }
  