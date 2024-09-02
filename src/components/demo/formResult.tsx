"use client"
import { useEffect, useState } from "react"
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import {  CheckIcon } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import saarlogo from '../image/saarlog.jpg'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import {
  Card,
  CardTitle,
} from "@/components/ui/card"





const accountFormSchema = z.object({
  startDate: z.string()
  .regex(/^\d{2}-\d{2}-\d{4}$/, {
       message: "Name must be in the format dd-mm-yyyy."
  })
  .refine((date) => {
    const [day, month,] = date.split('-').map(Number);
    return day <= 31 && month <= 12;
  }, {
    message: "Day must not exceed 31 and month must not exceed 12.",
  }),
    endDate: z.string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, {
      message: "Name must be in the format dd-mm-yyyy."
 })
 .refine((date) => {
  const [day, month] = date.split('-').map(Number);
  return day <= 31 && month <= 12;
}, {
  message: "Day must not exceed 31 and month must not exceed 12.",
}),
  intermediate: z.number({
    required_error: "Please select the intermediate.",
  }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}
export function FormResult() {
  const navigate = useNavigate()
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })
   
  function onSubmit(data: AccountFormValues) {
  navigate(`/Tunovers/${data.startDate}/${data.endDate}/${data.intermediate}`)
  //navigate(`/TableData?startDate=${startDate}&endDate=${endDate}&code=${code}`);
  }
  type Tintermediate = {
    CODEINTE: number
    RAISOCIN: string
    NOM_RESP: string
    TELEINTE: string
   }
  
    const [intermediate, setIntermediate] = useState<Tintermediate[]>([])

useEffect(() => {
   const fetchData = async () => {
       try {
        const { data } = await axios.get('http://localhost:8803/reporting-app/intermediaries/getAll')

            
                setIntermediate(data.data)
             
             console.log(intermediate)
       } catch (error) {
         console.log("THE PROBLEM", error)
       }
   }

   fetchData()
}, [])


  return (
      <Card style={{marginLeft: '40%'}} className={cn("w-[340px]") }>
        <CardTitle><img className=" w-52 h-52 mt-16 ml-10 rounded-3xl " src={saarlogo} alt="logo" /></CardTitle>
        <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col items-center ">
      <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date to start</FormLabel>
              <FormControl>
                <Input placeholder="day-month-years" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date to end</FormLabel>
              <FormControl>
                <Input placeholder="day-month-years" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intermediate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>intermediary</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? intermediate?.find(
                            (intermediate) => intermediate.CODEINTE === field.value
                          )?.RAISOCIN
                        : "Select intermediate"}
                      
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>Intermediate not found.</CommandEmpty>
                      {/* //TODO: Verifier que les donnees ont ete bien recupere (intermediate.map)si non resourdre le probleme. */}
                      <CommandGroup>
                        {intermediate && intermediate?.map((inter, idx) => (
                          <CommandItem
                            value={inter.RAISOCIN}
                            key={idx}
                            onSelect={() => {
                              form.setValue("intermediate", inter.CODEINTE)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                inter.CODEINTE === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            { inter.RAISOCIN}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button style={{background: 'hsl(217.9 10.6% 64.9%)', marginBottom: '15px'}}  type="submit"> Generate table</Button>
      </form>
    </Form>
</Card>
    
  )
}

  