import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

// sell data
import { SellData } from 'src/app/SellData';
import { sellsData } from 'src/app/mock-data';

// emp data 
import { empData } from "src/app/employee-mock-data";
import { EmployeeData } from 'src/app/EmployeeData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getSellData ():Observable<SellData[]> {
    const sellData = of(sellsData);
    return sellData;
  }

  getEmployeeData ():Observable<EmployeeData[]> {
    return of(empData);
  }
}
