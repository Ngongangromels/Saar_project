import {
    Menubar,
   
    MenubarMenu,
    
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import { Link } from 'react-router-dom';
  import saarlogo from '../image/saarlog.jpg'

  interface Props {
    startDate: string
    endDate: string
    intermediate: number
  }
  
  export const NavBar: React.FC<Props> = ({startDate, endDate, intermediate}) => {
    return (
      <Menubar  className="w-full flex flex-row items-center justify-center h-34 mb-12  ">
        <MenubarMenu >
        <MenubarTrigger className="flex flex-row items-start justify-start"><img className=" w-16 h-16 rounded-3xl " src={saarlogo} alt="logo" /></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu >
        <MenubarTrigger className="flex flex-row items-start justify-start"><Link to='/FormResult'>Home</Link></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu >
        <MenubarTrigger className="flex flex-row items-start justify-start"><Link to={`/Tunovers/${startDate}/${endDate}/${intermediate}`}>Turnovers</Link></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger> <Link to={`/Collection/${startDate}/${endDate}/${intermediate}`}>Collection</Link></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger><Link to={`/Certificate/${startDate}/${endDate}/${intermediate}`}>Certificate</Link></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger><Link to={`/SalesForce/${startDate}/${endDate}/${intermediate}`}>Sales force</Link></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger><Link to={`/ExpenditureRevenue/${startDate}/${endDate}/${intermediate}`}>Expenditure and revenue</Link></MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    )
  }
  