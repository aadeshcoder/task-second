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

// imports for mat-tree
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';

// interface for managers Tree
interface ManagerNode {
  name: string,
  children?: ManagerNode[]
}

// data for managerNode tree
const TREE_DATA: ManagerNode[] = [
  {
    name: "Arjun Shekhawat",
    children: [{ name: "Kushagra Gupta" }, { name: "Netra Patil" }, { name: "Adesh Tendolkar" }]
  },
  {
    name: "Rahul Sharma",
    children: [{ name: "Divyanshu Shukla" }, { name: "Ayush Agrawal" }, { name: "Mitali Kawale" }]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

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

  // tree's stuff
  private _transformer = (node: ManagerNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    }
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  getLevel = (node: ExampleFlatNode) => node.level;

  treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  constructor(
    public sidebarExpandService: SidebarExpandService,
    private dataService: DataService,
  ) {
    this.treeDataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  /** The selection for checklist */
  checkListSelection = new SelectionModel<ExampleFlatNode>(true);

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: ExampleFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checkListSelection.isSelected(child);
    })
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ExampleFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checkListSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: ExampleFlatNode): void {
    this.checkListSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checkListSelection.isSelected(node)
      ? this.checkListSelection.select(...descendants)
      : this.checkListSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checkListSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: ExampleFlatNode): void {
    this.checkListSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: ExampleFlatNode): void {
    let parent: ExampleFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: ExampleFlatNode): void {
    const nodeSelected = this.checkListSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checkListSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checkListSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checkListSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  // tree stuff ended

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
