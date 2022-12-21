import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SidebarExpandService } from 'src/app/services/sidebar-expand.service';

// import for dataService
import { DataService } from 'src/app/services/data.service';
// imports for sell data
import { SellData } from 'src/app/SellData';

// imports for employee data
import { EmployeeData } from 'src/app/EmployeeData';

// imports for mat-table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  sellData: SellData[] = [];
  empData: EmployeeData[] = [];

  // mat-table code
  displayedColumns: string[] = ['id', 'name', 'department', 'age', 'userId'];
  dataSource: MatTableDataSource<EmployeeData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public sidebarExpandService: SidebarExpandService,
    private dataService: DataService,
  ) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getEmpData(); // call for emp data
    this.getSellsData(); // call for sells data
  }

  // getting data from the mock-data file
  getSellsData() {
    this.dataService.getSellData().subscribe((data) => this.sellData = data);
  }

  getEmpData() {
    this.dataService.getEmployeeData().subscribe((data) => {
      this.empData = data;
      this.dataSource = new MatTableDataSource(this.empData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
