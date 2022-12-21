import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [],
  exports: [
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class MaterialModule { }
