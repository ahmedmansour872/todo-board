import { DialogComponent } from './../dialog/dialog.component';
import { Column } from 'src/app/models/column.model';
import { Component } from '@angular/core';
import { Board } from '../models/board.model';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Type } from '../models/type.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  type = Type
  board: Board = new Board('task board', [
    new Column('New', [
      { name: 'task 1', finish: false },
      { name: 'task 2', finish: false },
      { name: 'task 3', finish: false },
      { name: 'task 4', finish: true }
    ]),
    new Column('Active', [
      { name: 'task 1', finish: true },
      { name: 'task 2', finish: false },
      { name: 'task 3', finish: false },
      { name: 'task 4', finish: false }
    ]),
    new Column('Resolved', [
      { name: 'task 1', finish: false },
      { name: 'task 2', finish: true },
      { name: 'task 3', finish: false },
      { name: 'task 4', finish: false }
    ]),
    new Column('Closed', [
      { name: 'task 1', finish: false },
      { name: 'task 2', finish: false },
      { name: 'task 3', finish: true },
      { name: 'task 4', finish: false }
    ])
  ]);

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.board)
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openDialog(column: Column, value: string, type: Type, isEdit: boolean = true, index = 0): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { value: value, type: type, isEdit: isEdit },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.value) return
      if (isEdit) {
        if (result.type == this.type.column)
          column.name = result.value
        else
          column.tasks[index].name = result.value
      }
      else
        column.tasks[column.tasks.length] = { name: result.value, finish: false }
    });

  }

}
